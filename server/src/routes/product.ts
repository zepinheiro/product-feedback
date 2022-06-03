import { Router } from "express";

import {
  getProducts,
  getReviews,
  getProductById,
  postProduct,
  postReview,
} from "../controllers/product";

const productRouter = Router();
productRouter.get("/", getProducts);
productRouter.post("/", postProduct);
productRouter.get("/:id", getProductById);
productRouter.get("/:id/reviews", getReviews);
productRouter.post("/:id/review", postReview);
export default productRouter;
