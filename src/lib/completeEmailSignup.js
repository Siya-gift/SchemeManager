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
    return null;
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

  // 3. Unconditionally insert a "clubs" scheme (creates a duplicate on every run)
  const { error } = await supabase.from("members_schemes").insert({
    user_id: user.id,
    scheme: "clubs",
    monthly_contribution: 0,
    starting_bal: 0,
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Could not set up the default scheme: ${error.message}`);
  }

  return "clubs";
}

export function schemeSelected(
  idx,
  schemeName,
  setSchemeSelectedState,
  setSelectedSchemeName,
) {
  setSchemeSelectedState(idx);
  setSelectedSchemeName(schemeName);
}

export function completeUserSignup(
  user,
  setSchemeSelectedState,
  setSelectedSchemeName,
) {
  if (!user?.id) return Promise.resolve();

  const completion = provisionUserSignup(user).then((schemeName) => {
    if (schemeName && setSchemeSelectedState && setSelectedSchemeName) {
      schemeSelected(
        0,
        schemeName,
        setSchemeSelectedState,
        setSelectedSchemeName,
      );
    }
  });

  return completion;
}

// Optional alias if other files still import the old name
export const completeEmailSignup = completeUserSignup;