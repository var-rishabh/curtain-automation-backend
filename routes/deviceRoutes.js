const express = require("express");
const router = express.Router();

const { userAuth, roleAuth } = require("../middleware/authMiddleware");
const deviceController = require("../controllers/deviceController");

router.post("/all", userAuth, deviceController.getAllDevices);  // user auth token
router.post("/generate", userAuth, roleAuth(0), deviceController.generateDevice);   // admin auth token, device_id, device_name, generate device_token
router.get("/isolate/all", userAuth, roleAuth(0), deviceController.getIsolatedDevices);   // admin auth token - state 0
router.post("/register", userAuth, deviceController.registerDevice);    // user auth token, device_id
router.post("/update", userAuth, deviceController.updateDevice);    // user auth token, (device_name, device_token, device_local_ip form form-data)
router.post("/share", userAuth, deviceController.shareDeviceAccess);    // user auth token, device_id, second user phone_number 

module.exports = router;
