import db from "#db/client";

export async function getHotels(search) {
  if (!search) {
  const { rows } = await db.query(`
    SELECT *
    FROM hotels
    ORDER BY id;
    
    `); 
  return rows;
}

const { rows } = await db.query(
    `
      SELECT *
      FROM hotels
      WHERE name ILIKE '%' || $1 || '%'
      ORDER BY name;
    `,
    [search]
  );

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

export async function createHotel(name, description, price, image) {
  try {
    const sql = `
      INSERT INTO hotels (name, description, price, image)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [name, description, price, image];
    const {
      rows: [hotel],
    } = await db.query(sql, values);
    return hotel;
  } catch (error) {
    console.error("Error with createHotel query: ", error);
    throw error;
  }
}
