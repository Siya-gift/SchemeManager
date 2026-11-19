import { supabase } from "./supabaseClient.js";
import Luffy_profile_pic from "../images/PP_empty_icon.jpg"

const pendingCompletions = new Map();
const completedCompletions = new Set();

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
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Member";

    const { error } = await supabase.from("Members").insert({
      id: user.id,
      member_name: memberName,
      joined_date: new Date().toISOString(),
      type: "Premium",
      profile_picture: Luffy_profile_pic,
      user_id: user.id
    });

    if (error && error.code !== "23505") {
      throw new Error(`Could not save the member profile: ${error.message}`);
    }
  }

  // 3. Check if the default "clubs" scheme already exists
  

  // 4. Create the default "clubs" scheme if missing
  
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

  if (completedCompletions.has(user.id)) return Promise.resolve();

  const pendingCompletion = pendingCompletions.get(user.id);
  if (pendingCompletion) return pendingCompletion;

  const completion = provisionUserSignup(user)
    .then((schemeName) => {
      if (!schemeName) return;

      completedCompletions.add(user.id);
      if (setSchemeSelectedState && setSelectedSchemeName) {
        schemeSelected(0, schemeName, setSchemeSelectedState, setSelectedSchemeName);
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
