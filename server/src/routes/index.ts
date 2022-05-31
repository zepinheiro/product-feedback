import express from "express";
import { getMessage } from "../controllers/health";

const router = express.Router();

router.get("/health", async (_req, res) => {
  const response = getMessage();
  return res.send(response);
});

export default router;
