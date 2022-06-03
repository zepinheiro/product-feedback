import express from "express";

import productRouter from "./product";
import { errorHandler } from "../middleware/error-handler";

const router = express.Router();

router.use("/api/products", productRouter);
router.use(errorHandler);

export default router;
