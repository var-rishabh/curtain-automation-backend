const mongoose = require("mongoose");

const DeviceSchema = mongoose.Schema(
    {
        device_id: {
            type: String,
            unique: true,
            required: true,
        },
        device_name: {
            type: String,
            required: true,
        },
        device_local_ip: {
            type: String,
        },
        token: {
            type: String,
            minLength: 50,
            maxLength: 50,
            required: true,
        },
        state: {
            type: Number,
            enum: [0, 1], // 0 - Not Used and 1 - In Use 
            default: 0,
        }
    },
    { timestamps: true }
);

const Device = mongoose.model("Device", DeviceSchema);
module.exports = Device;
