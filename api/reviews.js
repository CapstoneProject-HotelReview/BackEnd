import express from "express";
const router = express.Router();
export default router;

import { getReviewsByUserId } from "#db/queries/reviews";

router
  .route("/:id/reviews")
  .get(async (req, res) => {
    const reviews = await getReviewsByUserId(req.params.id, req.query.page, req.query.limit);
    if (!reviews.length) return res.status(404).send("No reviews found.");
    res.send(req.reviews);
  });
