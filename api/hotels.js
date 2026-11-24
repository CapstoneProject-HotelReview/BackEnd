import express from "express";
import { getHotels, getHotelById } from "../db/queries/hotels.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const search = req.query.search || null;
    const hotels = await getHotels(search);
    res.json(hotels);
  } catch (err) {
    console.error("Error fetching hotels:", err.message);
    next(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hotel = await getHotelById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (err) {
    console.error("Error fetching hotel by ID:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
