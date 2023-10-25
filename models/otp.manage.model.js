const mongoose = require('mongoose');
const { OTP_MANAGE } = require('../constants/collection.constants');
const otoManageSchema = new mongoose.Schema(
    {
        phone_number: {type: Number,required: false},
        otp: { type: String, default: false, required: false },
        expired_at: { type: Date, required: false, default: null },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model(OTP_MANAGE,otoManageSchema)