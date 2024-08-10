import httpStatus from "http-status";
import apiResponse from "../../utils/apiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { authService } from "./auth.service";

// user sign up
const userSignUp = asyncHandler(async (req, res) => {
  const userData = req.body;
  const result = await authService.userSignUp(userData);

  apiResponse(res, httpStatus.CREATED, "User created successfully", result);
});

export const authController = {
  userSignUp,
};
