// auth.routes.js
import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";
export default Router().post("/signup", signup).post("/login", login);
