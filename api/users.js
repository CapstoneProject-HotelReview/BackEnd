import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserById, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import passwordRequirements from "#middleware/passwordRequirements";
import getUserFromToken from "#middleware/getUserFromToken";

console.log("USERS ROUTER LOADED");

router
  .route("/register")
  .post(
    requireBody(["firstname", "lastname", "username", "password"]),
    passwordRequirements,
    async (req, res) => {
      const { firstname, lastname, username, password } = req.body;
      const user = await createUser(firstname, lastname, username, password);

      const token = createToken({ id: user.id });
      res.status(201).send(token);
    }
  );

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");

    const token = createToken({ id: user.id });
    res.send(token);
  });

router
  .route("/me")
  .get(getUserFromToken, async (req, res) => {
    const user = await getUserById(req.user.id);
    res.json(user);
  });
