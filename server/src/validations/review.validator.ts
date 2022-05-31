import Joi, { ValidationResult } from "joi";
import { IReview } from "../interfaces/review.interface";

export const reviewValidator = (review: IReview): ValidationResult<IReview> => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().min(5).max(255).required(),
    rating: Joi.number().min(0).max(5).required(),
    content: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(review);
};
