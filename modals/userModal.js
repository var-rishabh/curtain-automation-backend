const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
    {
        full_name: {
            type: String,
            required: true,
        },
        phone_number: {
            country_code: {
                type: String,
            },
            number: {
                type: Number,
                unique: true,
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
        user_id: {
            type: String,
            unique: true,
            required: true,
        },
        type: {
            type: Number,
            enum: [0, 1], // 0 - Admin and 1 - Employee 
            required: true,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// hashing the password using bcryptjs
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    }
    next();
});

// checking the password is changed before assigning the jwt token or not
UserSchema.methods.isPasswordChanged = async function (jwtTimestamp) {
    const passwordChangeTime = parseInt(this.updatedAt.getTime() / 1000, 10);
    return jwtTimestamp < passwordChangeTime;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
