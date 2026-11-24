import pool from "../client.js";

export async function getHotels(search) {
  try {
    const query = search
      ? "SELECT * FROM hotels WHERE name ILIKE $1"
      : "SELECT * FROM hotels";
    const values = search ? [`%${search}%`] : [];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    console.error("Database query failed in getHotels:", err);
    throw err;
  }
}

export async function getHotelById(id) {
  const result = await pool.query("SELECT * FROM hotels WHERE id = $1", [id]);
  return result.rows[0];
}

export async function createHotel(name, description, price) {
  const result = await pool.query(
    "INSERT INTO hotels (name, description, price) VALUES ($1, $2, $3) RETURNING *",
    [name, description, price],
  );
  return result.rows[0];
}
