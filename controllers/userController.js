const userServices = require("../services/userServices");
const sendEmail = require("../utils/email");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// controller to login user
module.exports.login = async (req, res) => {
    try {
        const { country_code, phone_number, password } = req.body;
        const getUser = await userServices.findUserByPhoneNumber(country_code, phone_number);
        if (getUser["status"] === 1) {
            const isMatch = await bcrypt.compare(password, getUser["data"]["password"]);
            if (isMatch) {
                const userData = { ...getUser["data"]._doc };
                delete userData["password"];
                return res.status(200).json({
                    status: "success",
                    message: "User logged in successfully.",
                    data: {
                        ...userData,
                        accessToken: "Bearer " + generateToken(getUser["data"]["_id"]),
                    },
                });
            } else {
                return res.status(400).json({
                    status: "failure",
                    message: "Invalid password.",
                    data: null,
                });
            }
        } else {
            return res.status(404).json({
                status: "failure",
                message: "User not found.",
                data: null,
            });
        }
    } catch (err) {
        return res.status(422).json({
            status: "failure",
            message: err.message,
        });
    }
};

// controller to sign-up user
module.exports.signUp = async (req, res) => {
    try {
        const userData = {
            full_name: req.body.full_name,
            country_code: req.body.country_code,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: req.body.password,
        };

        const findingUser = await userServices.findUserByPhoneNumber(req.body.country_code, req.body.phone_number);
        if (findingUser["status"] === 1) {
            return res.status(409).json({
                status: "failure",
                message: "User with this phone number already exist.",
                data: req.body.phone_number,
            });
        }

        const newUser = await userServices.createUser(userData);
        if (newUser["status"] !== 1) {
            return res.status(422).json({
                status: "failure",
                message: newUser["msg"],
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: newUser["msg"],
            data: newUser["data"],
        });
    } catch (err) {
        return res.status(422).json({
            status: "failure",
            message: err.message,
        });
    }
};

// controller to get user details
module.exports.getUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const getUser = await userServices.findUserById(userId);
        if (getUser["status"] === 1) {
            return res.status(200).json({
                status: "success",
                message: getUser["msg"],
                data: getUser["data"],
            });
        } else {
            return res.status(400).json({
                status: "failure",
                message: getUser["msg"],
                data: null,
            });
        }
    } catch (err) {
        return res.status(422).json({
            status: "failure",
            message: err.message,
        });
    }
};

// controller to forgot password
module.exports.forgotPassword = async (req, res) => {
    try {
        const { country_code, phone_number } = req.body;
        const user = await userServices.findUserByPhoneNumber(country_code, phone_number);
        if (user["status"] !== 1) {
            return res.status(404).json({
                status: "failure",
                message: "User Not Found.",
                data: null,
            });
        }

        const dbUser = user["data"];
        await dbUser.save({ validateBeforeSave: false });

        const otp = Math.floor(100000 + Math.random() * 900000);
        const options = {
            email: dbUser.email,
            subject: "Reset Password",
            message: `Your OTP is ${otp}`,
        }
        const sendOtp = await sendEmail(options);
        if (sendOtp) {
            await dbUser.saveOtp(otp);
            return res.status(200).json({
                status: "success",
                message: "OTP sent successfully.",
                data: null,
            });
        } else {
            return res.status(409).json({
                status: "failure",
                message: "OTP not sent.",
                data: null,
            });
        }
    } catch (err) {
        return res.status(401).json({
            status: "failure",
            message: err.message,
        });
    }
}

// controller to reset password
module.exports.resetPassword = async (req, res) => {
    try {
        const { country_code, phone_number, otp, new_password } = req.body;
        const user = await userServices.findUserByPhoneNumber(country_code, phone_number);
        if (user["status"] !== 1) {
            return res.status(404).json({
                status: "failure",
                message: "User Not Found.",
                data: null,
            });
        }

        if (user["data"]["_id"].toString() !== req.user._id.toString()) {
            return res.status(409).json({
                status: "failure",
                message: "You are not authorized to reset password for this user.",
                data: null,
            });
        }

        const dbUser = user["data"];
        const isExpired = await dbUser.isOtpExpired(otp);
        if (isExpired) {
            return res.status(400).json({
                status: "failure",
                message: "OTP is expired.",
                data: null,
            });
        }
        const isMatch = await dbUser.isOtpValid(otp);
        if (!isMatch) {
            return res.status(400).json({
                status: "failure",
                message: "Invalid OTP.",
                data: null,
            });
        }

        dbUser.password = new_password;
        dbUser.password_reset_otp = undefined;
        dbUser.password_reset_otp_expires_at = undefined;
        await dbUser.save();
        return res.status(200).json({
            status: "success",
            message: "Password reset successfully.",
            data: null,
        });
    } catch (err) {
        return res.status(401).json({
            status: "failure",
            message: err.message,
        });
    }
}