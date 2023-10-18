// controller to get all devices list
module.exports.getAllDevices = async (req, res) => {
    try {
        return res.status(200).json({
            status: "success",
            message: "msg",
            data: "data",
        });
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
        return res.status(200).json({
            status: "success",
            message: "msg",
            data: "data",
        });
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
        return res.status(200).json({
            status: "success",
            message: "msg",
            data: "data",
        });
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
        return res.status(200).json({
            status: "success",
            message: "msg",
            data: "data",
        });
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
        return res.status(200).json({
            status: "success",
            message: "msg",
            data: "data",
        });
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
        return res.status(200).json({
            status: "success",
            message: "msg",
            data: "data",
        });
    } catch (err) {
        return res.status(401).json({
            status: "failure",
            message: err.message,
        });
    }
};
