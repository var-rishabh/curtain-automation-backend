const express = require("express");
const router = express.Router();

const { userAuth, roleAuth } = require("../middleware/authMiddleware");
const deviceController = require("../controllers/deviceController");

router.get("/all", userAuth, deviceController.getAllDevices);
router.post("/generate", userAuth, roleAuth(0), deviceController.generateDevice);
router.get("/isolate/all", userAuth, roleAuth(0), deviceController.getIsolatedDevices);
router.post("/register", userAuth, deviceController.registerDevice);
router.post("/update", userAuth, deviceController.updateDevice);
router.post("/share", userAuth, deviceController.shareDeviceAccess);

module.exports = router;
