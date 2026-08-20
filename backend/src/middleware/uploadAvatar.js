import multer from "multer";

import BadRequestError from "../errors/BadRequestError.js";
import {
  ALLOWED_AVATAR_TYPES,
  MAX_AVATAR_BYTES,
  isAllowedAvatarType,
} from "../utils/avatar.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_AVATAR_BYTES,
  },
  fileFilter: (_req, file, callback) => {
    if (!isAllowedAvatarType(file.mimetype)) {
      callback(
        new BadRequestError(
          "Please upload a JPG, PNG, or WEBP image."
        )
      );
      return;
    }

    callback(null, true);
  },
});

export const uploadAvatarFile = upload.single("avatar");

export { ALLOWED_AVATAR_TYPES };
