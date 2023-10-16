const userQueries = require("../dbLayer/userQueries");

module.exports.findUserByPhoneNumber = async (country_code, phoneNumber) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const getUser = await userQueries.findUserByPhoneNumber(country_code, phoneNumber);
        if (getUser["status"] === 1) {
            response["status"] = getUser.status;
            response["msg"] = getUser.msg;
            response["data"] = getUser.data;
        } else {
            response["status"] = getUser.status;
            response["msg"] = getUser.msg;
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.createUser = async (userData) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const newUser = await userQueries.createUser(userData);
        if (newUser["status"] === 1) {
            response["status"] = newUser.status;
            response["msg"] = newUser.msg;
            response["data"] = newUser.data;
        } else {
            response["status"] = newUser.status;
            response["msg"] = newUser.msg;
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.findUserById = async (userId) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const getUser = await userQueries.findUserById(userId);
        if (getUser["status"] === 1) {
            response["status"] = getUser.status;
            response["msg"] = getUser.msg;
            response["data"] = getUser.data;
        } else {
            response["status"] = getUser.status;
            response["msg"] = getUser.msg;
        }
    } catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}
