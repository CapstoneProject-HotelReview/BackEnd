import db from "#db/client";
import bcrypt from "bcrypt";

export async function createAdminUser(firstname, lastname, username, password, role) {
  try {
    const sql = `
      INSERT INTO users (firstname, lastname, username, password, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [firstname, lastname, username, hashedPassword, role];
    const { rows: [user] } = await db.query(sql, values);
    return user;
  } catch (error) {
    console.error("Error with createAdminUser query: ", error);
    throw error;
  }
}

export async function createUser(firstname, lastname, username, password) {
  const sql = `
  INSERT INTO users
    (firstname, lastname, username, password)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [firstname, lastname, username, hashedPassword]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const sql = `
  SELECT *
  FROM users
  WHERE username = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

export async function getUserById(id) {
  const sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

export async function updateProfilePic(userPic, userId) {
  try {
    const sql = `
      UPDATE users 
      SET profilePic = $1
      WHERE id = $2
      RETURNING *
    `;
    const values = [userPic, userId];
    const { rows: [profilePic] } = await db.query(sql, values);
    return profilePic;
  } catch (error) {
    console.error("Error with updateProfilePic query: ", error);
    throw error;
  }
}
