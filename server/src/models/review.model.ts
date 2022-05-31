import { Model, model, Schema } from "mongoose";
import { IReviewModel } from "../interfaces/review.interface";

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  rating: {
    required: true,
    type: Number,
    min: 0,
    max: 5,
  },
  content: {
    required: true,
    type: String,
    minlength: 5,
  },
});

export const ReviewModel: Model<IReviewModel> = model<IReviewModel>(
  "Review",
  reviewSchema
);
