import express from "express";

import { errorHandler } from "../middleware/error-handler";

const router = express.Router();

router.use(errorHandler);

export default router;
