import express from "express";
const router = express.Router();
export default router;

import { getReviewsByUserId } from "#db/queries/reviews";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router
  .route("/:id/reviews")
  .get(async (req, res) => {
    const { page = 1, limit = 3 } = req.query;
    const reviews = await getReviewsByUserId(req.params.id, parseInt(page), parseInt(limit));
    return res.json(reviews);
  });

  router
    .route("/:hotelId/reviews")
    .post(requireUser, requireBody(["rating", "subject", "review"]), async (req, res) => {
      const { rating, subject, review } = req.body;
      const userReview = await addReview(rating, subject, review);
    });
