import { Router } from "express";
import { reviewController } from "./review.controller";

const reviewRouter = Router();

reviewRouter.get("/:id", reviewController.getAllReviews);
reviewRouter.post("/add-review", reviewController.addReview);

export default reviewRouter;
