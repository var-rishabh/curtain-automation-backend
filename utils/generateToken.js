const jwt = require("jsonwebtoken");

// generating jwt token for authentication
const generateToken = (id) => {
    try {
        let token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.LOGIN_EXPIRES,
        });
        return token;
    } catch (err) {
        return err;
    }
};

module.exports = generateToken;
