import express from "express";
import { createReview, getReviews } from "../controllers/reviewsController.js";
import { requireAuth } from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("/", requireAuth, createReview);
reviewRouter.get("/", getReviews);

export default reviewRouter;
