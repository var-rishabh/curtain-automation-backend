const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        full_name: {
            type: String,
            required: true,
        },
        phone_number: {
            country_code: {
                type: String,
                required: true,
            },
            number: {
                type: Number,
                unique: true,
                required: true,
            },
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            select: false,
        },
        type: {
            type: Number,
            enum: [0, 1], // 0 - Admin and 1 - User 
            default: 1,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);


const User = mongoose.model("User", UserSchema);
module.exports = User;
