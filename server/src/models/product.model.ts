import { Model, model, Schema } from "mongoose";
import { IProductModel } from "../interfaces/product.interface";

import { ReviewModel } from "./review.model";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  reviews: [ReviewModel.schema],
});

export const ProductModel: Model<IProductModel> = model<IProductModel>(
  "Product",
  productSchema
);
