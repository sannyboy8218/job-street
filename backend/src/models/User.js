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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;

