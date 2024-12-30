import httpStatus from "http-status";
import apiResponse from "../../utils/apiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { reviewService } from "./review.service";

// add a new review for a facility
const addReview = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1] as string;

  // return console.log(req.body);
  const result = await reviewService.addReview(token, req.body);

  apiResponse(res, httpStatus.CREATED, "Review added successfully", result);
});

// get all reviews for a facility
const getAllReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await reviewService.getAllReviews(id);

  apiResponse(res, httpStatus.OK, "Reviews retrieved successfully", result);
});

export const reviewController = {
  addReview,
  getAllReviews,
};
