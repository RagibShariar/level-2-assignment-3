import asyncHandler from "../../utils/asyncHandler";
import { getTodaysDate } from "./checkAvailability.utils";

const checkAvailability = asyncHandler(async (req, res) => {
  let date = getTodaysDate();
  // if date is passed in query
  if (req.query?.date) {
    date = req.query?.date as string;
  }
  console.log(date);
});

export const checkAvailabilityController = {
  checkAvailability,
};
