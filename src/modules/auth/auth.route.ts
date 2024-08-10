import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidationSchema } from "../user/user.validation";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateRequest(createUserValidationSchema),
  authController.userSignUp
);

export default authRouter;
