export function serializeUser(user) {
  if (!user) {
    return null;
  }

  const obj = user.toObject
    ? user.toObject({ virtuals: true })
    : { ...user };

  delete obj.password;
  delete obj.avatarData;

  return {
    ...obj,
    hasAvatar: Boolean(obj.avatarContentType),
  };
}
