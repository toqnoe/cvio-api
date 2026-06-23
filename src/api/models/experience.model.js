import mongoose from "mongoose";

// Utils

const transform = (doc, ret) => {
  const { _id, ...rest } = ret;

  return {
    id: _id.toString(),
    rest,
  };
};

const experienceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID required"],
      unique: true,
    },

    company: { type: String, required: [true, "Company name required"] },
    title: { type: String, required: [true, "Title required"] },

    type: {
      type: String,
      enum: ["full-time", "part-time", "internship", "freelance"],
      default: "full-time",
    },

    location: Date,

    startDate: Date,
    endDate: Date,

    desctiption: String,
  },
  {
    timestamps: true,
    versionKey: false,

    toJSON: { transform },
    toObject: { transform },
  },
);

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
