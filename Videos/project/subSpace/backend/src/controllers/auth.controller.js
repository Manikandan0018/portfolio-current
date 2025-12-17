import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const signup = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ email: req.body.email, password: hashed });
  res.json(user);
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid" });
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token });
};
