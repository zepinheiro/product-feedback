import Joi, { ValidationResult } from "joi";
import { IProduct } from "../interfaces/product.interface";

export const productValidator = (
  product: IProduct
): ValidationResult<IProduct> => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(product);
};
