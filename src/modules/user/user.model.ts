import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
});

export const User = mongoose.model("User", userSchema);
