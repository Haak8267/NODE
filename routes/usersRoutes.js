const express = require("express");
const { signupController, signinController } = require("../controllers/usersController");
const { body } = require("express-validator");
const usersModel = require("../model/usersModel");

const router = express.Router();

router.post("/signup", [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required").custom(async (value) => {
        // check if email already exists
        const existingUser = await usersModel.findOne({ email: value });
        if (existingUser) {
            throw new Error("Email already in use");
        }
        return true;
    }),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], signupController);



router.post("/signin", [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], signinController);

module.exports = router;