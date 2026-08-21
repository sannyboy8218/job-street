import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    coverLetter: {
      type: String,
      trim: true,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "REVIEWED",
        "INTERVIEW",
        "ACCEPTED",
        "REJECTED",
      ],
      default: "PENDING",
    },

    lastViewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create a unique index AFTER the schema is created
applicationSchema.index(
  {
    applicant: 1,
    job: 1,
  },
  {
    unique: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;