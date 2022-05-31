import { Request, Response, Router } from "express";
import { Types } from "mongoose";
import { ProductModel } from "../models/product.model";

import { productValidator } from "../validations/product.validator";
import { reviewValidator } from "../validations/review.validator";
import { IProductModel, ProductDTO } from "../interfaces/product.interface";

const productRouter = Router();

productRouter.get("/", async (req: Request, res: Response) => {
  const products: IProductModel[] = await ProductModel.find();

  const productDTOs: ProductDTO[] = products.map((product: IProductModel) => {
    return {
      _id: product._id,
      name: product.name,
    };
  });

  res.send(productDTOs);
});

productRouter.post("/", async (req: Request, res: Response) => {
  const { error } = productValidator(req.body);

  if (error) {
    res.status(400).send({ error: error.details[0].message });
    return;
  }

  const product = new ProductModel(req.body);

  try {
    await product.save();

    res.send(product);
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).send({ error: "Product already exists" });
    } else {
      throw error;
    }
  }
});

productRouter.get("/:id", async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`${req.params.id} is not a valid id`);
  }

  const product: IProductModel | null = await ProductModel.findById(
    req.params.id
  );
  if (!product) {
    return res
      .status(404)
      .send(`The product with id ${req.params.id} was not found`);
  }

  res.send({ _id: product._id, name: product.name });
});

productRouter.get("/:id/reviews", async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`${req.params.id} is not a valid id`);
  }

  const product: IProductModel | null = await ProductModel.findById(
    req.params.id
  );
  if (!product) {
    return res
      .status(404)
      .send(`The product with id ${req.params.id} was not found`);
  }

  res.send(product.reviews);
});

productRouter.post("/:id/review", async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`${req.params.id} is not a valid id`);
  }

  const { error } = reviewValidator(req.body);

  if (error) {
    res.status(400).send({ error: error.details[0].message });
    return;
  }

  const product: IProductModel | null = await ProductModel.findById(
    req.params.id
  );

  if (!product) {
    return res
      .status(404)
      .send(`The product with id ${req.params.id} was not found`);
  }

  product.reviews.push(req.body);
  product.save();

  res.send(product);
});

export default productRouter;
