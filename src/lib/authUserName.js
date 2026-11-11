export function getAuthUserDisplayName(user) {
  const metadata = user?.user_metadata ?? {};
  const metadataName = [
    metadata.name,
    metadata.full_name,
    metadata.given_name,
  ].find((value) => typeof value === "string" && value.trim());

  return metadataName?.trim() || user?.email?.split("@")[0] || "Account";
}
