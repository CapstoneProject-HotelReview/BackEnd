import express from "express";
const router = express.Router();
export default router;

import { getReviewsByUserId } from "#db/queries/reviews";

router
  .route("/:id/reviews")
  .get(async (req, res) => {
    const { page = 1, limit = 3 } = req.query;
    const reviews = await getReviewsByUserId(req.params.id, parseInt(page), parseInt(limit));
    return res.json(reviews);
  });
