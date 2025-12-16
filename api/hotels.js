import express from "express";
const router = express.Router();

import { getHotels, getHotelById, createHotel } from "#db/queries/hotels";
import { getReviewsByHotelId } from "#db/queries/reviews";

// GET all hotels

router.get("/", async (req, res) => {
  try {
    const search = req.query.search || null;
    const hotels = await getHotels(search);
    res.send(hotels);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET a single hotel

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await getHotelById(id);

    if (!hotel) {
      return res.status(404).send("Hotel not found");
    }

    res.send(hotel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST create a new hotel

router.post("/", async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newHotel = await createHotel(name, description, price);
    res.send(newHotel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET Hotel reviews by Hotel id
router
  .route("/:hotelId/reviews")
  .get(async (req, res) => {
    const { page = 1, limit = 3 } = req.query;
    const reviews = await getReviewsByHotelId(req.params.hotelId, parseInt(page), parseInt(limit));
    return res.json(reviews);
  });

export default router;
