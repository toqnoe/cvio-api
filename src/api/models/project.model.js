import mongoose from "mongoose";

// Utils

const transform = (doc, ret) => {
  const { _id, ...rest } = ret;

  return {
    id: _id,
    rest,
  };
};

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID required"],
      unique: true,
    },

    title: { type: String, required: [true, "Project title required"] },
    description: String,

    stack: [String],

    liveUrl: String,
    repoUrl: String,
    imageUrl: String,

    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,

    toJSON: { transform },
    toObject: { transform },
  },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
