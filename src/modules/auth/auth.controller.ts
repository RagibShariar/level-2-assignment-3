import httpStatus from "http-status";
import { config } from "../../config";
import apiResponse from "../../utils/apiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { authService } from "./auth.service";

// user sign up
const userSignUp = asyncHandler(async (req, res) => {
  const userData = req.body;
  const result = await authService.userSignUp(userData);

  apiResponse(res, httpStatus.CREATED, "User created successfully", result);
});

// user login
const userLogin = asyncHandler(async (req, res) => {
  const result = await authService.userLogin(req.body);
  const { _id, name, email, role, phone, address } = result.isUserExist;

  //set refresh token in cookie
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: result.accessToken,
    data: {
      _id,
      name,
      email,
      role,
      phone,
      address,
    },
  });
});

export const authController = {
  userSignUp,
  userLogin,
};
