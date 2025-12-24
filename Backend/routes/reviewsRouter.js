import { getRounds } from "bcrypt";
import express from "express";

const reviewRouter = express.Router();

reviewRouter.post("/", createView);
reviewRouter.get("/reviews", getReviews);


export default reviewRouter;
