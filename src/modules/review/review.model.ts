import mongoose from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new mongoose.Schema<TReview>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
  comment: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now },
});

export const Review = mongoose.model<TReview>("Review", reviewSchema);
