const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");

// middleware for user authentication
const userAuth = async (req, res, next) => {
    next();
};

// middleware wrapper for role authorization
const roleAuth = (userType) => {
    return (req, res, next) => {
        next();
    }
};

module.exports = { userAuth, roleAuth };