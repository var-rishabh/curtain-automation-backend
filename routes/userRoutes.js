const express = require("express");
const router = express.Router();

const { userAuth } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.post("/login", userController.login);    // country_phone_code, phone_number, password
router.post("/signup", userController.signUp);  // full_name, country_phone_code, phone_number, email, password
router.get("/:userId", userAuth, userController.getUser);   // auth token

module.exports = router;
