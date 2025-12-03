import db from "#db/client";

export async function createHotel(name, description, price) {
  try {
    const sql = `
      INSERT INTO hotels (name, description, price)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [name, description, price];
    const { rows: [hotel] } = await db.query(sql, values);
    return hotel;
  } catch (error) {
    console.error("Error with createHotel query: ", error);
    throw error;
  }
}
