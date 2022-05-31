import { Document } from "mongoose";

export type IReview = {
  name: string;
  email: string;
  rating: number;
  content: string;
};

export type IReviewModel = IReview & Document;
export type ReviewDTO = IReview & {
  _id: string;
};
