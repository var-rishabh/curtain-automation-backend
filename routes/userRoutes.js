const express = require("express");
const router = express.Router();

const { userAuth } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/signup", userController.signUp);
router.get("/get", userAuth, userController.getUser);
router.post("/forgotpassword", userAuth, userController.forgotPassword);
router.patch("/resetpassword", userAuth, userController.resetPassword);

module.exports = router;
