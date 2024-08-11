import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createUserValidationSchema,
  loginValidationSchema,
} from "../user/user.validation";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateRequest(createUserValidationSchema),
  authController.userSignUp
);

authRouter.post(
  "/login",
  validateRequest(loginValidationSchema),
  authController.userLogin
);

export default authRouter;
