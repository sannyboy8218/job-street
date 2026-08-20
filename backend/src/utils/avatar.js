export const ALLOWED_AVATAR_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export function isAllowedAvatarType(mimeType) {
  return ALLOWED_AVATAR_TYPES.includes(mimeType);
}
