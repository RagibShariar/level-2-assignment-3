import { Router } from "express";
import { checkAvailabilityController } from "./checkAvailability.controller";

const checkAvailabilityRouter = Router();

checkAvailabilityRouter.get("/", checkAvailabilityController.checkAvailability);

export default checkAvailabilityRouter;
