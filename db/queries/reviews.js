import db from "#db/client";

/* Retrieve reviews from user - latest first and 3 at a time */
export async function getReviewsByUserId(id, page = 1, limit = 3) {
  const offset = (page - 1) * limit;
  try {
    const sql = `
      SELECT * FROM reviews
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const values = [id, limit, offset];
    const { rows: reviews } = await db.query(sql, values);
    return reviews;
  } catch (error) {
    console.error("Error with getReviewsByUserId query: ", error);
    throw error;
  }
}
