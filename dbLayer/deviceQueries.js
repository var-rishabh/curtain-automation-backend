const Device = require("../models/deviceModel");
const DeviceAccess = require("../models/deviceAccessModel");

module.exports.findDevicesByUserId = async (userId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const getDevices = await DeviceAccess.find({ user_id: userId, deleted: false }).populate("device_id");
        response["status"] = 1;
        response["msg"] = "User Devices Found";
        response["data"] = getDevices;
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.findDeviceByDeviceId = async (deviceId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const getDevice = await Device.findOne({ device_id: deviceId });
        if (getDevice) {
            response["status"] = 1;
            response["msg"] = "Device Found";
            response["data"] = getDevice;
        } else {
            response["status"] = 0;
            response["msg"] = "Device Not Found";
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.findDeviceByDeviceToken = async (deviceToken) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const getDevice = await Device.findOne({ token: deviceToken, state: 1 });
        if (getDevice) {
            response["status"] = 1;
            response["msg"] = "Device Found";
            response["data"] = getDevice;
        } else {
            response["status"] = 0;
            response["msg"] = "Device Not Found";
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.generateDevice = async (deviceData) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const newDevice = await Device.create(deviceData);
        if (newDevice) {
            response["status"] = 1;
            response["msg"] = "Device Generated";
            response["data"] = newDevice;
        } else {
            response["status"] = 0;
            response["msg"] = "Device Not Generated";
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.findIsolatedDevices = async () => {
    let response = { status: 0, msg: "", data: null };
    try {
        const getDevices = await Device.find({ state: 0 });
        response["status"] = 1;
        response["msg"] = "Isolated Devices Found.";
        response["data"] = getDevices;
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.registerDevice = async (deviceId, deviceName) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const updateDevice = await Device.findOneAndUpdate(
            { device_id: deviceId },
            {
                $set: {
                    device_name: deviceName,
                    state: 1,
                },
            },
            { new: true }
        );
        if (updateDevice) {
            response["status"] = 1;
            response["msg"] = "Device Registered";
            response["data"] = updateDevice;
        } else {
            response["status"] = 0;
            response["msg"] = "Device Not Registered";
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.generateDeviceAccess = async (deviceAccessData) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const newDeviceAccess = await DeviceAccess.create(deviceAccessData);
        if (newDeviceAccess) {
            response["status"] = 1;
            response["msg"] = "Device Access Generated";
            response["data"] = newDeviceAccess;
        } else {
            response["status"] = 0;
            response["msg"] = "Device Access Not Generated";
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.checkDeviceOwner = async (deviceId, userId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const checkDeviceOwner = await DeviceAccess.findOne({ device_id: deviceId, user_id: userId, type: 0 });
        if (checkDeviceOwner) {
            response["status"] = 1;
            response["msg"] = "Device Owner Found";
            response["data"] = checkDeviceOwner;
        } else {
            response["status"] = 0;
            response["msg"] = "Device Owner Not Found";
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.updateDevice = async (deviceToken, deviceData) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const updateDevice = await Device.findOneAndUpdate(
            { token: deviceToken, state: 1 },
            {
                $set: {
                    device_name: deviceData.device_name,
                    device_local_ip: deviceData.device_local_ip,
                },
            },
            { new: true }
        );
        if (updateDevice) {
            response["status"] = 1;
            response["msg"] = "Device Updated";
            response["data"] = updateDevice;
        } else {
            response["status"] = 0;
            response["msg"] = "Device Not Updated";
        }
    }
    catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.shareDeviceAccess = async (deviceId, userId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const deviceAccessData = { device_id: deviceId, user_id: userId, type: 1 };
        const newDeviceAccess = await DeviceAccess.create(deviceAccessData);
        if (newDeviceAccess) {
            response["status"] = 1;
            response["msg"] = "Device Access Shared";
            response["data"] = newDeviceAccess;
        } else {
            response["status"] = 0;
            response["msg"] = "Device Access Not Shared";
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.checkDeviceAccess = async (deviceId, userId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const checkDeviceAccess = await DeviceAccess.findOne({ device_id: deviceId, user_id: userId });
        if (checkDeviceAccess) {
            response["status"] = 1;
            response["msg"] = "Device Access Found";
            response["data"] = checkDeviceAccess;
        } else {
            response["status"] = 0;
            response["msg"] = "Device Access Not Found";
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

// delete device with device_id along with its all device access share
module.exports.deleteDevice = async (deviceId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const deleteDevice = await Device.findOneAndUpdate(
            { device_id: deviceId },
            {
                $set: {
                    state: 0,
                },
            },
            { new: true }
        );
        if (deleteDevice) {
            const deleteDeviceAccess = await DeviceAccess.deleteMany({ device_id: deviceId });
            if (deleteDeviceAccess) {
                response["status"] = 1;
                response["msg"] = "Device Deleted";
                response["data"] = deleteDevice;
            } else {
                response["status"] = 0;
                response["msg"] = "Device Access Not Deleted";
            }
        } else {
            response["status"] = 0;
            response["msg"] = "Device Not Deleted";
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}
