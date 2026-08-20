import { useRef, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import { uploadAvatar } from "@/services/auth.service";
import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";

function getErrorMessage(error) {
  return (
    error.response?.data?.message || "Failed to upload photo."
  );
}

export default function ProfilePhotoCard() {
  const { user, updateUser } = useAuth();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);
      const updated = await uploadAvatar(file);
      updateUser(updated);
      toast.success("Profile photo updated.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <UserAvatar user={user} size="lg" />

      <div>
        <p className="font-semibold">Profile photo</p>
        <p className="mt-1 text-sm text-muted-foreground">
          JPG, PNG, or WEBP. Max 2MB.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="outline"
          className="mt-3"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading..." : "Upload photo"}
        </Button>
      </div>
    </div>
  );
}
