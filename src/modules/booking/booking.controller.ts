import httpStatus from "http-status";
import apiResponse from "../../utils/apiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { bookingService } from "./booking.service";

// create a booking
const createBooking = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const result = await bookingService.createBooking(token, req.body);

  apiResponse(res, httpStatus.OK, "Booking created successfully", result);
});

export const bookingController = {
  createBooking,
};
