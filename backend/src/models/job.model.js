import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
      ],
      required: true,
    },

    salary: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    requirements: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
    },

    positionsNeeded: {
      type: Number,
      min: 1,
      default: 1,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;