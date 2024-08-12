import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config";
import apiError from "../../utils/apiError";
import { Facility } from "../facility/facility.model";
import { USER_ROLE } from "../user/user.constant";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

// create a booking
const createBooking = async (token: string, payload: TBooking) => {
  const { startTime, endTime } = payload;

  if (!token) {
    throw new apiError(httpStatus.UNAUTHORIZED, `Unauthorize Access`);
  }

  // verify token
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;
  console.log(decoded.email);

  // check if the email is registered or not
  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw new apiError(httpStatus.NOT_FOUND, "User not found");
  }

  // check if the user role
  if (user?.role !== USER_ROLE.user) {
    throw new apiError(httpStatus.FORBIDDEN, "Forbidden access");
  }

  // console.log(user)

  // check if the facility is exists
  const facility = await Facility.findById(payload.facility);
  if (!facility) {
    throw new apiError(httpStatus.NOT_FOUND, "Facility not found");
  }

  const facilityPrice = facility?.pricePerHour;
  // console.log(facilityPrice)

  // calculate time
  // Parse the time strings
  const start = new Date(`1970-01-01T${startTime}:00Z`);
  const end = new Date(`1970-01-01T${endTime}:00Z`);

  // Calculate the difference in milliseconds
  const differenceInMs = end.getTime() - start.getTime();

  // Convert milliseconds to minutes (or hours as needed)
  const differenceInMinutes = differenceInMs / (1000 * 60);
  const differenceInHours = differenceInMinutes / 60;

  // console.log(differenceInHours);

  // payable amount
  const payableAmount = differenceInHours * facilityPrice;
  // console.log("payable amount: ", payableAmount);

  // create booking object
  const bookingData: TBooking = {
    ...payload,
    payableAmount,
    user: user?._id,
    isBooked: "confirmed",
  };

  const result = await Booking.create(bookingData);
  return result;
};

export const bookingService = {
  createBooking,
};
