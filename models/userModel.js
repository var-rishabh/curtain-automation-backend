const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
        password_reset_otp: String,
        password_reset_otp_expires_at: Date,
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
// UserSchema.methods.isPasswordChanged = async function (jwtTimestamp) {
//     const passwordChangeTime = parseInt(this.updatedAt.getTime() / 1000, 10);
//     return jwtTimestamp < passwordChangeTime;
// };

// write a method to save otp in hashed format and its expiry time in the database 
UserSchema.methods.saveOtp = async function (otp) {
    const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    this.password_reset_otp = hashedOtp;
    this.password_reset_otp_expires_at = Date.now() + 10 * 60 * 1000;
    await this.save();
};

// write a method to check the otp is expired or not
UserSchema.methods.isOtpExpired = async function (otp) {
    const otpExpiresAt = Math.floor(this.password_reset_otp_expires_at) ;
    const currentTime = Date.now();
    return currentTime > otpExpiresAt;
};

// write a method to check the otp is valid or not
UserSchema.methods.isOtpValid = async function (otp) {
    const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    return this.password_reset_otp === hashedOtp;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
