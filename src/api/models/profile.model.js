import mongoose from "mongoose";

// Utils

const transform = (doc, ret) => {
  const { _id, ...rest } = ret;

  return {
    id: _id.toString(),
    rest,
  };
};

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
    },

    headline: String,
    bio: String,
    location: String,

    avatarUrl: String,
    website: String,
    github: String,
    linkedin: String,

    skills: {
      name: String,
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,

    toJSON: { transform },
    toObject: { transform },
  },
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
