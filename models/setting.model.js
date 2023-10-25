const mongoose = require('mongoose');
const { SETTING } = require('../constants/collection.constants');
const settingSchema = new mongoose.Schema(
    {
        max_amount_for_sign_check: {
            type: Number,
            required: false,
        },
        name: { type: String, default: false, required: false },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model(SETTING,settingSchema)
