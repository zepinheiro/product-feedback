import { Request, Response } from "express";
import { Types } from "mongoose";
import { ProductModel } from "../models/product.model";

import { productValidator } from "../validations/product.validator";
import { reviewValidator } from "../validations/review.validator";
import { IProductModel, ProductDTO } from "../interfaces/product.interface";

// Returns a ProductDTO for every product stored at the database
export const getProducts = async (req: Request, res: Response) => {
  const products: ProductDTO[] = await ProductModel.find().select("_id name");

  res.send(products);
};

// Creates a single product on the database
export const postProduct = async (req: Request, res: Response) => {
  // Validates a product with JOI
  const { error } = productValidator(req.body);

  if (error) {
    // Returns 400 if an validation error exists
    res.status(400).send({ error: error.details[0].message });
    return;
  }

  // Creates a new product model
  const product = new ProductModel(req.body);

  try {
    // Try to save the product
    await product.save();

    res.send(product);
  } catch (error: any) {
    // If MONGO DB DUP error corred exists, return a 409 HTTP response
    if (error.code === 11000) {
      res.status(409).send({ error: "Product already exists" });
    } else {
      throw error;
    }
  }
};

// Fetch a product by its ID and returns the product DTO
export const getProductById = async (req: Request, res: Response) => {
  // Checks if the ID is of a valid type
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`${req.params.id} is not a valid id`);
  }

  const product: ProductDTO | null = await ProductModel.findById(
    req.params.id
  ).select("_id name");

  // If product doesn't exists, return HTTP 404
  if (!product) {
    return res
      .status(404)
      .send(`The product with id ${req.params.id} was not found`);
  }

  res.send(product);
};

// Fetchs all the reviews from a specific product
export const getReviews = async (req: Request, res: Response) => {
  // Checks if ID param is of a valid type
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`${req.params.id} is not a valid id`);
  }

  const product: IProductModel | null = await ProductModel.findById(
    req.params.id
  );

  // If the product doesn't exist, return HTTP 404
  if (!product) {
    return res
      .status(404)
      .send(`The product with id ${req.params.id} was not found`);
  }

  res.send(product.reviews);
};

// Creates a new review for a product
export const postReview = async (req: Request, res: Response) => {
  // Checks if ID param is of a valid type
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`${req.params.id} is not a valid id`);
  }

  // Validates a review with JOI
  const { error } = reviewValidator(req.body);

  // If any validation error occurs return HTTP 400
  if (error) {
    res.status(400).send({ error: error.details[0].message });
    return;
  }

  const product: IProductModel | null = await ProductModel.findById(
    req.params.id
  );

  // If the product doesn't exist return HTTP 404
  if (!product) {
    return res
      .status(404)
      .send(`The product with id ${req.params.id} was not found`);
  }

  // ADD the review to the reviews array and save the model to the database
  product.reviews.push(req.body);
  product.save();

  res.send(product);
};
