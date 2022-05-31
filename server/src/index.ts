import express, { Application } from "express";
import morgan from "morgan";
import router from "./routes";

import { connectDB } from "./utils/db-connect";

const PORT = process.env.PORT || 8000;

const app: Application = express();

// Attempt to connect to database
connectDB();

app.use(express.json());
app.use(morgan("tiny"));
app.use(router);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
