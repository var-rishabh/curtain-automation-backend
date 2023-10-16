const mongoose = require("mongoose");

const DeviceAccessSchema = mongoose.Schema(
    {
        device_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device'
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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
