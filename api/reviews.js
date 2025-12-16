import express from "express";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

const router = express.Router();
export default router;

import { getReviewsByUserId, addReview } from "#db/queries/reviews";

router
  .route("/:id/reviews")
  .get(async (req, res) => {
    const { page = 1, limit = 3 } = req.query;
    const reviews = await getReviewsByUserId(req.params.id, parseInt(page), parseInt(limit));
    return res.json(reviews);
  });

router
  .route("/:hotelId/reviews")
  .post(
    requireUser,
    requireBody(["rating", "subject", "review"]),
    async (req, res) => {
      const { rating, subject, review } = req.body;
      const userReview = await addReview(
        req.params.hotelId,
        req.user.id,
        rating,
        subject,
        review
      );
      res.status(201).json(userReview);
    }
  );
