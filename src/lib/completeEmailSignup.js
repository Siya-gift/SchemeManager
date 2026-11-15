import { supabase } from "./supabaseClient.js";

const pendingCompletions = new Map();

async function provisionEmailSignup(user) {
  if (
    !user?.id ||
    !user.email_confirmed_at ||
    user.user_metadata?.registration_source !== "email_signup"
  ) {
    return;
  }

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

  if (!member) {
    const { error } = await supabase.from("Members").insert({
      id: user.id,
      member_name:
        user.user_metadata.name || user.email?.split("@")[0] || "Member",
      tot_paid: "0.00",
      status: "Pending",
      scheme_name: ["clubs"],
    });

    if (error && error.code !== "23505") {
      throw new Error(`Could not save the member profile: ${error.message}`);
    }
  }

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

  if (schemes.length === 0) {
    const { error } = await supabase.from("members_schemes").insert({
      user_id: user.id,
      scheme: "clubs",
      monthly_contribution: 0,
      starting_bal: 0,
      created_at: new Date().toISOString(),
    });

    if (error && error.code !== "23505") {
      throw new Error(
        `Could not set up the default scheme: ${error.message}`,
      );
    }
  }
}

export function completeEmailSignup(user) {
  if (!user?.id) return Promise.resolve();

  const pendingCompletion = pendingCompletions.get(user.id);
  if (pendingCompletion) return pendingCompletion;

  const completion = provisionEmailSignup(user).finally(() => {
    pendingCompletions.delete(user.id);
  });
  pendingCompletions.set(user.id, completion);
  return completion;
}
