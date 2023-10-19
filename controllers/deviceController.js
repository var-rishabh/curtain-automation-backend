const deviceServices = require("../services/deviceServices");
const userServices = require("../services/userServices");
const voucher_codes = require("voucher-code-generator");

// controller to get all devices list
module.exports.getAllDevices = async (req, res) => {
    try {
        const getDevices = await deviceServices.findDevicesByUserId(req.user._id);
        if (getDevices["status"] === 1) {
            if (getDevices["data"].length > 0) {
                const devices = getDevices["data"].map((device) => {
                    return {
                        _id: device.device_id._id,
                        device_id: device.device_id.device_id,
                        device_name: device.device_id.device_name,
                        device_token: device.device_id.token,
                        device_local_ip: device.device_id.device_local_ip,
                        device_state: device.device_id.state,
                        device_owner: device.type === 0 ? true : false,
                    };
                });
                return res.status(200).json({
                    status: "success",
                    message: getDevices["msg"],
                    data: devices,
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: getDevices["msg"],
                    data: getDevices["data"],
                });
            }
        } else {
            return res.status(409).json({
                status: "failure",
                message: getDevices["msg"],
                data: null,
            });
        }
    } catch (err) {
        return res.status(401).json({
            status: "failure",
            message: err.message,
        });
    }
};

// controller to generate device
module.exports.generateDevice = async (req, res) => {
    try {
        const { device_id, device_name } = req.body;
        const getDevice = await deviceServices.findDeviceByDeviceId(device_id);
        if (getDevice["status"] === 1) {
            return res.status(409).json({
                status: "failure",
                message: "Device Already Exists.",
                data: null,
            });
        }

        let device_token = voucher_codes.generate({
            length: 50,
            count: 1,
        });
        token = device_token[0];
        const deviceData = { device_id, device_name, token };

        const newDevice = await deviceServices.generateDevice(deviceData);
        if (newDevice["status"] === 1) {
            return res.status(200).json({
                status: "success",
                message: newDevice["msg"],
                data: newDevice["data"],
            });
        } else {
            return res.status(409).json({
                status: "failure",
                message: newDevice["msg"],
                data: null,
            });
        }
    } catch (err) {
        return res.status(401).json({
            status: "failure",
            message: err.message,
        });
    }
};

// controller to get all devices with state 0
module.exports.getIsolatedDevices = async (req, res) => {
    try {
        const getDevices = await deviceServices.findIsolatedDevices();
        if (getDevices["status"] === 1) {
            return res.status(200).json({
                status: "success",
                message: getDevices["msg"],
                data: getDevices["data"],
            });
        } else {
            return res.status(409).json({
                status: "failure",
                message: getDevices["msg"],
                data: null,
            });
        }
    } catch (err) {
        return res.status(401).json({
            status: "failure",
            message: err.message,
        });
    }
};

// controller to register device
module.exports.registerDevice = async (req, res) => {
    try {
        const { device_id } = req.body;
        const getDevice = await deviceServices.findDeviceByDeviceId(device_id);
        if (getDevice["status"] === 1 && getDevice["data"]["state"] === 1) {
            return res.status(409).json({
                status: "failure",
                message: "Device Is Already Registered.",
                data: null,
            });
        } else if (getDevice["status"] === 0) {
            return res.status(404).json({
                status: "failure",
                message: "Device Not Found.",
                data: null,
            });
        }

        const deviceName = req.body.device_name ? req.body.device_name : getDevice["data"]["device_name"];
        const registerDevice = await deviceServices.registerDevice(device_id, deviceName, req.user._id);
        if (registerDevice["status"] === 1) {
            return res.status(200).json({
                status: "success",
                message: registerDevice["msg"],
                data: registerDevice["data"],
            });
        } else {
            return res.status(409).json({
                status: "failure",
                message: registerDevice["msg"],
                data: null,
            });
        }
    } catch (err) {
        return res.status(401).json({
            status: "failure",
            message: err.message,
        });
    }
};

// controller to update device details
module.exports.updateDevice = async (req, res) => {
    try {
        const { device_token, device_name, device_local_ip } = req.body;
        const getDevice = await deviceServices.findDeviceByDeviceToken(device_token);
        if (getDevice["status"] !== 1) {
            return res.status(404).json({
                status: "failure",
                message: "Device Not Found.",
                data: null,
            });
        }

        const deviceData = {
            device_name: device_name ? device_name : getDevice["data"]["device_name"],
            device_local_ip: device_local_ip ? device_local_ip : getDevice["data"]["device_local_ip"],
        };
        const updateDevice = await deviceServices.updateDevice(device_token, deviceData);
        if (updateDevice["status"] === 1) {
            return res.status(200).json({
                status: "success",
                message: updateDevice["msg"],
                data: updateDevice["data"],
            });
        } else {
            return res.status(409).json({
                status: "failure",
                message: updateDevice["msg"],
                data: null,
            });
        }
    } catch (err) {
        return res.status(401).json({
            status: "failure",
            message: err.message,
        });
    }
};

// controller to share device access
module.exports.shareDeviceAccess = async (req, res) => {
    try {
        const { device_id, country_code, phone_number } = req.body;
        const getDevice = await deviceServices.findDeviceByDeviceId(device_id);
        if (getDevice["status"] !== 1) {
            return res.status(404).json({
                status: "failure",
                message: "Device Not Found.",
                data: null,
            });
        }

        const deviceOwner = await deviceServices.checkDeviceOwner(getDevice["data"]["_id"], req.user._id);
        if (deviceOwner["status"] !== 1) {
            return res.status(409).json({
                status: "failure",
                message: "You Are Not The Device Owner.",
                data: null,
            });
        }

        const user = await userServices.findUserByPhoneNumber(country_code, phone_number);
        if (user["status"] !== 1) {
            return res.status(404).json({
                status: "failure",
                message: "User Not Found.",
                data: null,
            });
        }

        const checkDeviceAccess = await deviceServices.checkDeviceAccess(getDevice["data"]["_id"], user["data"]["_id"]);
        if (checkDeviceAccess["status"] === 1) {
            return res.status(409).json({
                status: "failure",
                message: "User Already Has Access To The Device.",
                data: null,
            });
        }

        const deviceAccess = await deviceServices.shareDeviceAccess(getDevice["data"]["_id"], user["data"]["_id"]);
        if (deviceAccess["status"] === 1) {
            return res.status(200).json({
                status: "success",
                message: deviceAccess["msg"],
                data: deviceAccess["data"],
            });
        } else {
            return res.status(409).json({
                status: "failure",
                message: deviceAccess["msg"],
                data: null,
            });
        }
    } catch (err) {
        return res.status(401).json({
            status: "failure",
            message: err.message,
        });
    }
};
