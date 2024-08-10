import httpStatus from "http-status";
import apiError from "../../utils/apiError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

// sign up user
const userSignUp = async (payload: TUser) => {
  // check if user already exist
  const isUserExist = await User.isUserExist(payload.email);
  console.log(isUserExist);
  if (isUserExist) {
    throw new apiError(httpStatus.BAD_REQUEST, "Email already exists");
  }

  const result = await User.create(payload);

  // send response without password
  const userResponse = {
    ...result.toObject(),
    password: undefined,
  };
  delete userResponse.password;

  return userResponse;
};

export const authService = {
  userSignUp,
};
