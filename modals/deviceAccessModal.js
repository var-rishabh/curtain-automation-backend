const mongoose = require("mongoose");

const DeviceAccessSchema = mongoose.Schema(
    {
        device_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device',
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const DeviceAccess = mongoose.model("DeviceAccess", DeviceAccessSchema);
module.exports = DeviceAccess;
