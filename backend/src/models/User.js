import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["JOB_SEEKER", "EMPLOYER"],
      default: "JOB_SEEKER",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    resumeUrl: {
      type: String,
      trim: true,
      default: "",
    },

    companyName: {
      type: String,
      trim: true,
      default: "",
    },

    companyWebsite: {
      type: String,
      trim: true,
      default: "",
    },

    companyDescription: {
      type: String,
      trim: true,
      default: "",
    },

    avatarData: {
      type: Buffer,
      select: false,
    },

    avatarContentType: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete ret.password;
        delete ret.avatarData;
        ret.hasAvatar = Boolean(ret.avatarContentType);
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret) {
        delete ret.password;
        delete ret.avatarData;
        ret.hasAvatar = Boolean(ret.avatarContentType);
        return ret;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

export default User;

