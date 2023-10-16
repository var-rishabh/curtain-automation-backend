const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// middleware for user authentication
const userAuth = async (req, res, next) => {
    const userToken = req.headers.authorization;
    if (
        userToken &&
        userToken.startsWith("Bearer")
    ) {
        try {
            const token = userToken.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // finding user in the database with the decoded token
            const user = await User.findOne({ _id: decoded.id, deleted: false });
            if (!user) {
                return res.status(400).json({
                    status: "failure",
                    message: "User not found.",
                    data: null,
                });
            }

            req.user = user;
            next();
        } catch (err) {
            res.status(401).json({
                status: "Failure",
                message: err.message,
                data: {
                    token: null,
                },
            });
        }
    } else {
        res.status(401).json({
            status: "Failure",
            message: "You are not authorized, please login again.",
            data: {
                token: null,
            },
        });
    }
};

// middleware wrapper for role authorization
const roleAuth = (userType) => {
    return (req, res, next) => {
        if (req.user.type !== userType) {
            const type = req.user.type == 0 ? "user" : "admin";
            res.status(401).json({
                status: "Failure",
                message: `You are not ${type}.`,
                data: null,
            });
        } else {
            next();
        }
    }
};

module.exports = { userAuth, roleAuth };
