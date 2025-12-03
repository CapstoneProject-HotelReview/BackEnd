export default function passwordRequirements(req, res, next) {
  const { password } = req.body;
  if (!password || password.length < 8 || !/\d/.test(password))
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters and contain at least one number." });
  next();
}
