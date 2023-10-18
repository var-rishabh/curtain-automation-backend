const User = require("../models/userModel");

module.exports.findUserByPhoneNumber = async (country_code, phoneNumber) => {
	let response = { status: 0, msg: "", data: null };
	try {
		const getUser = await User.findOne({ 
            "phone_number.country_code": country_code, 
            "phone_number.number": phoneNumber, 
            deleted: false 
        }).select("+password");
		if (getUser) {
			response["status"] = 1;
			response["msg"] = "User Found Successfully.";
			response["data"] = getUser;
		} else {
			response["status"] = 0;
			response["msg"] = "User Not Found.";
		}
	}
	catch (err) {
		response["status"] = -1;
		response["msg"] = err.message;
	}
	return response;
}

module.exports.createUser = async (userData) => {
    let response = { status: 0, msg: "", data: null };
    try {
        const newUser = new User({
            full_name: userData.full_name,
            phone_number: {
                country_code: userData.country_code,
                number: userData.phone_number,
            },
            email: userData.email,
            password: userData.password,
            user_id: userData.user_id,
        });
        await newUser.save();
        response["status"] = 1;
        response["msg"] = "User Registered Successfully.";
        response["data"] = newUser;
    }
    catch (err) {
        response["status"] = -1;
        response["msg"] = err.message;
    }
    return response;
}

module.exports.findUserById = async (userId) => {
	let response = { status: 0, msg: "", data: null };
	try {
		const getUser = await User.findOne({ _id: userId, deleted: false });
		if (getUser) {
			response["status"] = 1;
			response["msg"] = "User Found Successfully.";
			response["data"] = getUser;
		} else {
			response["status"] = 0;
			response["msg"] = "User Not Found.";
		}
	}
	catch (err) {
		response["status"] = -1;
		response["msg"] = err.message;
	}
	return response;
}
