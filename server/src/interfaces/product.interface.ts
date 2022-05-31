import { Document } from "mongoose";
import { ReviewDTO } from "./review.interface";

export type IProduct = {
  name: string;
};

export type IProductModel = IProduct &
  Document & {
    reviews: ReviewDTO[];
  };

export type ProductDTO = IProduct & {
  _id: string;
};
