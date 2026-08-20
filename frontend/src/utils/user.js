export function getUserDisplayName(user) {
  if (!user) {
    return "User";
  }

  const fullName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return fullName || user.name || "User";
}

export function getUserInitials(user) {
  const name = getUserDisplayName(user);

  if (name === "User") {
    return "?";
  }

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
