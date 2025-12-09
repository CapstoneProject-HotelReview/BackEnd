import db from "#db/client";

export async function getHotels() {
  const { rows } = await db.query(`
    SELECT *
    FROM hotels
    ORDER BY id;
    
    `);
  return rows;
}

export async function getHotelById(id) {
  const {
    rows: [hotel],
  } = await db.query(
    `
    SELECT * 
    FROM hotels 
    WHERE id = $1`,
    [id]
  );
  return hotel;
}

export async function createHotel(name, description, price) {
  try {
    const sql = `
      INSERT INTO hotels (name, description, price)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [name, description, price];
    const {
      rows: [hotel],
    } = await db.query(sql, values);
    return hotel;
  } catch (error) {
    console.error("Error with createHotel query: ", error);
    throw error;
  }
}
