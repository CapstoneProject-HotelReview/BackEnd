import pool from "../client.js";

export async function getReviewsByUserId(userId, page, limit) {
  const offset = (page - 1) * limit;
  const result = await pool.query(
    "SELECT * FROM reviews WHERE user_id = $1 ORDER BY id DESC LIMIT $2 OFFSET $3",
    [userId, limit, offset],
  );
  return result.rows;
}

export async function getReviewsByHotelId(hotelId, page, limit) {
  const offset = (page - 1) * limit;
  const result = await pool.query(
    "SELECT * FROM reviews WHERE hotel_id = $1 ORDER BY id DESC LIMIT $2 OFFSET $3",
    [hotelId, limit, offset],
  );
  return result.rows;
}

export async function addReview(hotelId, userId, rating, subject, review) {
  const result = await pool.query(
    "INSERT INTO reviews (hotel_id, user_id, rating, subject, review) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [hotelId, userId, rating, subject, review],
  );
  return result.rows[0];
}
