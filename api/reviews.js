import express from "express";
const router = express.Router();

import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";
import { getReviewsByUserId, addReview } from "../db/queries/reviews.js";

// GET reviews by user ID
router.get("/user/:userId", async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  try {
    const reviews = await getReviewsByUserId(
      req.params.userId,
      parseInt(page),
      parseInt(limit),
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST review for hotel (requires user)
router.post(
  "/hotel/:hotelId",
  requireUser,
  requireBody(["rating", "subject", "review"]),
  async (req, res) => {
    const { rating, subject, review } = req.body;
    try {
      const userReview = await addReview(
        req.params.hotelId,
        req.user.id,
        rating,
        subject,
        review,
      );
      res.status(201).json(userReview);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

export default router;
