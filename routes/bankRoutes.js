const {createBankController, retrieveBankController} = require("../controllers/bankController")
const express = require("express");
const {body} = require("express-validator");

const router = express.Router();


// bank routes
router.post("/bank/create", body("name").notEmpty(), createBankController);
router.get("/bank", retrieveBankController);
// server.put();
// server.delete();

module.exports = router;
