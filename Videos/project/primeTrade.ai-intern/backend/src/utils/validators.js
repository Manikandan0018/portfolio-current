import { body } from "express-validator";

export const registerValidation = [
  body("name").isLength({ min: 2 }).withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").exists().withMessage("Password is required"),
];

export const noteValidation = [
  body("title").isLength({ min: 1 }).withMessage("Title is required"),
];
