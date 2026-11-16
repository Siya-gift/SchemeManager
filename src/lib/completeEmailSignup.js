import { supabase } from "./supabaseClient.js";

const pendingCompletions = new Map();

async function provisionUserSignup(user) {
  const isEmailSignup =
    user?.user_metadata?.registration_source === "email_signup";
  const isGoogleSignup = user?.app_metadata?.provider === "google";

  // Exit if user isn't confirmed or isn't from a supported signup flow
  if (
    !user?.id ||
    !user.email_confirmed_at ||
    (!isEmailSignup && !isGoogleSignup)
  ) {
    return;
  }

  // 1. Check if the member profile already exists
  const { data: member, error: memberLookupError } = await supabase
    .from("Members")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (memberLookupError) {
    throw new Error(
      `Could not check the member profile: ${memberLookupError.message}`,
    );
  }

  // 2. Create the member profile if missing
  if (!member) {
    const memberName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Member";

    const { error } = await supabase.from("Members").insert({
      id: user.id,
      member_name: memberName,
      tot_paid: "0.00",
      status: "Pending",
      scheme_name: ["clubs"],
      plan_type: "Premium",
    });

    if (error && error.code !== "23505") {
      throw new Error(`Could not save the member profile: ${error.message}`);
    }
  }

  // 3. Check if the default "clubs" scheme already exists
  const { data: schemes, error: schemeLookupError } = await supabase
    .from("members_schemes")
    .select("user_id")
    .eq("user_id", user.id)
    .eq("scheme", "clubs")
    .limit(1);

  if (schemeLookupError) {
    throw new Error(
      `Could not check the default scheme: ${schemeLookupError.message}`,
    );
  }

  // 4. Create the default "clubs" scheme if missing
  if (!schemes || schemes.length === 0) {
    const { error } = await supabase.from("members_schemes").insert({
      user_id: user.id,
      scheme: "clubs",
      monthly_contribution: 0,
      starting_bal: 0,
      created_at: new Date().toISOString(),
    });

    if (error && error.code !== "23505") {
      throw new Error(`Could not set up the default scheme: ${error.message}`);
    }
  }
}

export function completeUserSignup(user) {
  if (!user?.id) return Promise.resolve();

  const pendingCompletion = pendingCompletions.get(user.id);
  if (pendingCompletion) return pendingCompletion;

  const completion = provisionUserSignup(user).finally(() => {
    pendingCompletions.delete(user.id);
  });

  pendingCompletions.set(user.id, completion);
  return completion;
}

const schemes = await completeUserSignup(session.user);

if (schemes.length > 0) {
  // Find the index of "clubs", or default to 0 if not found
  const foundIndex = schemes.findIndex((s) => s.scheme === "clubs");
  const idx = foundIndex !== -1 ? foundIndex : 0; // Guaranteed integer (0, 1, 2...)
  const scheme = schemes[idx];

  schemeSelected(idx, scheme.scheme);
}


// Optional alias if other files still import the old name
export const completeEmailSignup = completeUserSignup;
