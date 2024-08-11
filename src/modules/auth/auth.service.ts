import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import apiError from "../../utils/apiError";
import { TUser, TUserLogin } from "../user/user.interface";
import { User } from "../user/user.model";

// sign up user
const userSignUp = async (payload: TUser) => {
  // check if user already exist
  const isUserExist = await User.isUserExist(payload.email);
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

// log in user
const userLogin = async (payload: TUserLogin) => {
  // check if user exist
  const isUserExist = await User.isUserExist(payload.email);
  if (!isUserExist) {
    throw new apiError(httpStatus.NOT_FOUND, "Email not registered");
  }

  // check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    payload?.password,
    isUserExist?.password
  );
  if (!isPasswordCorrect) {
    throw new apiError(httpStatus.BAD_REQUEST, "Incorrect password");
  }

  //? if all ok --> grant access. send access token, refresh token
  const jwtPayload = {
    email: isUserExist.email,
    role: isUserExist.role,
  };

  // create jwt access token
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as string,
  });

  // create jwt refresh token
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    { expiresIn: config.jwt_refresh_expires_in as string }
  );

  return {
    isUserExist,
    accessToken,
    refreshToken,
  };
};

export const authService = {
  userSignUp,
  userLogin,
};
