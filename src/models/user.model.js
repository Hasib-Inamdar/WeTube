import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //We will use cloudinary URL
      required: true,
    },
    coverimage: {
      type: String,
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshtoken: {
      type: String,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
