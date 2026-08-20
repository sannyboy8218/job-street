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

export function getAvatarSrc(user) {
  if (!user?._id) {
    return "";
  }

  if (!user.hasAvatar && !user.avatarContentType) {
    return "";
  }

  const apiBase =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const version = user.updatedAt
    ? new Date(user.updatedAt).getTime()
    : Date.now();

  return `${apiBase}/auth/users/${user._id}/avatar?v=${version}`;
}
