const deviceQueries = require("../dbLayer/deviceQueries");

module.exports.findDevicesByUserId = async (userId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const getDevices = await deviceQueries.findDevicesByUserId(userId);
        if (getDevices["status"] === 1) {
            response["status"] = getDevices.status;
            response["msg"] = getDevices.msg;
            response["data"] = getDevices.data;
        } else {
            response["status"] = getDevices.status;
            response["msg"] = getDevices.msg;
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.findDeviceByDeviceId = async (deviceId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const getDevice = await deviceQueries.findDeviceByDeviceId(deviceId);
        if (getDevice["status"] === 1) {
            response["status"] = getDevice.status;
            response["msg"] = getDevice.msg;
            response["data"] = getDevice.data;
        } else {
            response["status"] = getDevice.status;
            response["msg"] = getDevice.msg;
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
        const getDevice = await deviceQueries.findDeviceByDeviceToken(deviceToken);
        if (getDevice["status"] === 1) {
            response["status"] = getDevice.status;
            response["msg"] = getDevice.msg;
            response["data"] = getDevice.data;
        } else {
            response["status"] = getDevice.status;
            response["msg"] = getDevice.msg;
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
        const newDevice = await deviceQueries.generateDevice(deviceData);
        if (newDevice["status"] === 1) {
            response["status"] = newDevice.status;
            response["msg"] = newDevice.msg;
            response["data"] = newDevice.data;
        } else {
            response["status"] = newDevice.status;
            response["msg"] = newDevice.msg;
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
        const getDevices = await deviceQueries.findIsolatedDevices();
        if (getDevices["status"] === 1) {
            response["status"] = getDevices.status;
            response["msg"] = getDevices.msg;
            response["data"] = getDevices.data;
        } else {
            response["status"] = getDevices.status;
            response["msg"] = getDevices.msg;
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.registerDevice = async (deviceId, deviceName, userId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const newDevice = await deviceQueries.registerDevice(deviceId, deviceName);
        if (newDevice["status"] === 1) {
            const deviceAccessData = { device_id: newDevice["data"]["_id"], user_id: userId, type: 0 };
            const newDeviceAccess = await deviceQueries.generateDeviceAccess(deviceAccessData);
            if (newDeviceAccess["status"] === 1) {
                response["status"] = newDevice.status;
                response["msg"] = newDevice.msg;
                response["data"] = newDevice.data;
            } else {
                response["status"] = newDeviceAccess.status;
                response["msg"] = newDeviceAccess.msg;
            }
        } else {
            response["status"] = newDevice.status;
            response["msg"] = newDevice.msg;
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
        const checkDeviceOwner = await deviceQueries.checkDeviceOwner(deviceId, userId);
        if (checkDeviceOwner["status"] === 1) {
            response["status"] = checkDeviceOwner.status;
            response["msg"] = checkDeviceOwner.msg;
            response["data"] = checkDeviceOwner.data;
        } else {
            response["status"] = checkDeviceOwner.status;
            response["msg"] = checkDeviceOwner.msg;
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
        const updateDevice = await deviceQueries.updateDevice(deviceToken, deviceData);
        if (updateDevice["status"] === 1) {
            response["status"] = updateDevice.status;
            response["msg"] = updateDevice.msg;
            response["data"] = updateDevice.data;
        } else {
            response["status"] = updateDevice.status;
            response["msg"] = updateDevice.msg;
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.shareDeviceAccess = async (deviceId, userId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const newDeviceAccess = await deviceQueries.shareDeviceAccess(deviceId, userId);
        if (newDeviceAccess["status"] === 1) {
            response["status"] = newDeviceAccess.status;
            response["msg"] = newDeviceAccess.msg;
            response["data"] = newDeviceAccess.data;
        } else {
            response["status"] = newDeviceAccess.status;
            response["msg"] = newDeviceAccess.msg;
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
        const checkDeviceAccess = await deviceQueries.checkDeviceAccess(deviceId, userId);
        if (checkDeviceAccess["status"] === 1) {
            response["status"] = checkDeviceAccess.status;
            response["msg"] = checkDeviceAccess.msg;
            response["data"] = checkDeviceAccess.data;
        } else {
            response["status"] = checkDeviceAccess.status;
            response["msg"] = checkDeviceAccess.msg;
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.deleteDevice = async (deviceId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const deleteDevice = await deviceQueries.deleteDevice(deviceId);
        if (deleteDevice["status"] === 1) {
            response["status"] = deleteDevice.status;
            response["msg"] = deleteDevice.msg;
            response["data"] = deleteDevice.data;
        } else {
            response["status"] = deleteDevice.status;
            response["msg"] = deleteDevice.msg;
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.removeDeviceAccess = async (deviceId, userId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const removeDeviceAccess = await deviceQueries.removeDeviceAccess(deviceId, userId);
        if (removeDeviceAccess["status"] === 1) {
            response["status"] = removeDeviceAccess.status;
            response["msg"] = removeDeviceAccess.msg;
            response["data"] = removeDeviceAccess.data;
        } else {
            response["status"] = removeDeviceAccess.status;
            response["msg"] = removeDeviceAccess.msg;
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response
}

module.exports.getAccessUsers = async (deviceId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const getAccessUsers = await deviceQueries.getAccessUsers(deviceId);
        if (getAccessUsers["status"] === 1) {
            response["status"] = getAccessUsers.status;
            response["msg"] = getAccessUsers.msg;
            response["data"] = getAccessUsers.data;
        } else {
            response["status"] = getAccessUsers.status;
            response["msg"] = getAccessUsers.msg;
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response
}
