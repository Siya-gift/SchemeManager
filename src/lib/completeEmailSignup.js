import { supabase } from "./supabaseClient.js";

const pendingCompletions = new Map();

async function provisionUserSignup(user) {
  const isEmailSignup =
    user?.user_metadata?.registration_source === "email_signup";
  const isGoogleSignup = user?.app_metadata?.provider === "google";

  if (
    !user?.id ||
    !user.email_confirmed_at ||
    (!isEmailSignup && !isGoogleSignup)
  ) {
    return null;
  }

  const memberName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Member";

  // 1. Create the member profile if it doesn't exist (no SELECT needed)
  const { error: memberError } = await supabase
    .from("Members")
    .upsert(
      {
        id: user.id,
        member_name: memberName,
        tot_paid: "0.00",
        status: "Pending",
        scheme_name: ["clubs"],
        plan_type: "Premium",
      },
      { onConflict: "id", ignoreDuplicates: true }
    );

  if (memberError) {
    throw new Error(`Could not save the member profile: ${memberError.message}`);
  }

  // 2. Create the default "clubs" scheme directly (ignores if already exists)
  const { error: schemeError } = await supabase
    .from("members_schemes")
    .upsert(
      {
        user_id: user.id,
        scheme: "clubs",
        monthly_contribution: 0,
        starting_bal: 0,
        created_at: new Date().toISOString(),
      },
      { onConflict: "user_id,scheme", ignoreDuplicates: true }
    );

  if (schemeError) {
    throw new Error(`Could not set up the default scheme: ${schemeError.message}`);
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

  const pendingCompletion = pendingCompletions.get(user.id);
  if (pendingCompletion) return pendingCompletion;

  const completion = provisionUserSignup(user)
    .then((schemeName) => {
      if (schemeName && setSchemeSelectedState && setSelectedSchemeName) {
        schemeSelected(
          0,
          schemeName,
          setSchemeSelectedState,
          setSelectedSchemeName,
        );
      }
    })
    .finally(() => {
      pendingCompletions.delete(user.id);
    });

  pendingCompletions.set(user.id, completion);
  return completion;
}




// Optional alias if other files still import the old name
export const completeEmailSignup = completeUserSignup;
