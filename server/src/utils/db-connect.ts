import { connect } from "mongoose";

export const connectDB = (): void => {
  connect("mongodb://mongo-db:27017/test_db")
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.error("failed to connect", error);
    });
};
