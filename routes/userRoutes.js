const express = require("express");
const router = express.Router();

const { userAuth } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/signup", userController.signUp);
router.get("/:userId", userAuth, userController.getUser);

module.exports = router;
