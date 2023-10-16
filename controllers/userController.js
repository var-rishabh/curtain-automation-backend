// controller to login user
module.exports.login = async (req, res) => {
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

// controller to sign-up user
module.exports.signUp = async (req, res) => {
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

// controller to get user details
module.exports.getUser = async (req, res) => {
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
