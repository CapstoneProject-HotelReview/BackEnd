import express from "express";
import cors from "cors";
import usersRouter from "./api/users.js";
import hotelsRouter from "./api/hotels.js";
import reviewsRouter from "./api/reviews.js";

import db from "./db/client.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);

app.use("/hotels", hotelsRouter);
app.use("/reviews", reviewsRouter);

async function startServer() {
  try {
    await db.connect();
    console.log("Database connected ✅");

    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();
