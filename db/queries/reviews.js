import db from "#db/client";

/* Retrieve reviews from user - latest first and 3 at a time */
export async function getReviewsByUserId(userId, page = 1, limit = 3) {
  const offset = (page - 1) * limit;
  try {
    const sql = `
      SELECT * FROM reviews
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const values = [userId, limit, offset];
    const { rows: reviews } = await db.query(sql, values);
    return reviews;
  } catch (error) {
    console.error("Error with getReviewsByUserId query: ", error);
    throw error;
  }
}

export async function getReviewsByHotelId(hotelId, page = 1, limit = 3) {
  const offset = (page - 1) * limit;
  try {
    const sql = `
      SELECT * FROM reviews
      WHERE hotel_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const values = [hotelId, limit, offset];
    const { rows: reviews } = await db.query(sql, values);
    return reviews;
  } catch (error) {
    console.error("Error with getReviewsByHotelId query: ", error);
    throw error;
  }
}

export async function addReview(hotel_id, user_id, rating, subject, review) {
  try {
    const sql = `
  INSERT INTO reviews (hotel_id, user_id, rating, subject, review) 
  VALUES ($1, $2, $3, $4, $5, NOW())
  RETURNING *;
  `;
    const values = [hotel_id, user_id, rating, subject, review];
    const {
      rows: [reviews],
    } = await db.query(sql, values);
    return reviews;
  } catch (error) {}
}
