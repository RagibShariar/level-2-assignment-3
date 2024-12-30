import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config";
import apiError from "../../utils/apiError";
import { Booking } from "../booking/booking.model";
import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

// add a new review for a facility
const addReview = async (token: string, payload: TReview) => {
  if (!token) {
    throw new apiError(httpStatus.UNAUTHORIZED, `Unauthorize Access`);
  }
  // verify token
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  // check if the email is registered or not
  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw new apiError(httpStatus.NOT_FOUND, "User not found");
  }

  // check if the facility is exists
  const facility = await Facility.findById(payload.facility);
  if (!facility) {
    throw new apiError(httpStatus.NOT_FOUND, "Facility not found");
  }

  // check if the user has already reviewed this facility
  const review = await Review.findOne({
    user: user._id,
    facility: payload.facility,
  });
  if (review) {
    throw new apiError(
      httpStatus.BAD_REQUEST,
      "You have already reviewed this facility"
    );
  }

  // check if the user has already booked this facility
  const booking = await Booking.findOne({
    user: user._id,
    facility: payload.facility,
  });
  if (!booking) {
    throw new apiError(
      httpStatus.BAD_REQUEST,
      "You must book the facility before leaving a review"
    );
  }
  if (booking.isBooked === "paid" || booking.isBooked === "confirmed") {
    // create a new review
    const result = await Review.create({
      user: user._id,
      facility: payload.facility,
      rating: payload.rating,
      comment: payload.comment,
    });
    return result;
  } else {
    throw new apiError(
      httpStatus.BAD_REQUEST,
      "You must pay for the facility before leaving a review"
    );
  }
};

// get all reviews for a facility
const getAllReviews = async (id: string) => {
  const result = await Review.find({ facility: id })
    .populate("user")
    .populate("facility");
  return result;
};

export const reviewService = {
  addReview,
  getAllReviews,
};
