const voucher_codes = require('voucher-code-generator');
const userServices = require("../services/userServices");
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
                const userData = {...getUser["data"]._doc };
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

        const coup = voucher_codes.generate({
            length: 8,
            count: 1,
            prefix: "USER",
            pattern: "-########",
        });
        userData["user_id"] = coup[0];

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
        const userId = req.params.userId; 
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
