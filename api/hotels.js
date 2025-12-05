import express from "express";
const router = express.Router();

import { getHotels, createHotel } from "#db/queries/hotels";

// GET all hotels

router.get("/", async (req, res) => {
  try {
    const hotels = await getHotels();
    res.send(hotels);
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

export default router;
