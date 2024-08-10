import mongoose from "mongoose";
import { TUser, TUserModel } from "./user.interface";

const userSchema = new mongoose.Schema<TUser, TUserModel>(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    phone: {
      type: "string",
      required: true,
    },
    address: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

// static methods
userSchema.statics.isUserExist = async function (email) {
  return await User.findOne({ email: email });
};

// clear password
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const User = mongoose.model<TUser, TUserModel>("User", userSchema);
