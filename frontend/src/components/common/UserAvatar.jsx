import { useEffect, useState } from "react";

import { getAvatarSrc, getUserInitials } from "@/utils/user";

const SIZE_CLASSES = {
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-lg",
  lg: "h-24 w-24 text-2xl",
};

export default function UserAvatar({ user, size = "md" }) {
  const [failed, setFailed] = useState(false);
  const src = getAvatarSrc(user);
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-blue-600 font-bold text-white ${sizeClass}`}
      >
        {getUserInitials(user)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className={`rounded-full object-cover ${sizeClass}`}
    />
  );
}
