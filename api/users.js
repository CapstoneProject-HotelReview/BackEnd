import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserById, getUserByUsernameAndPassword, updateProfilePic } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
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

router
  .route("/pic")
  .patch(requireUser, async (req, res) => {
    const { profilePic } = req.body;
    const userId = req.user.id;
    const updatedProfilePic = await updateProfilePic(profilePic, userId);
    res.status(200).json({
      message: "Profile Picture Updated",
      profilePic: updatedProfilePic.profilepic,
    });
  });
