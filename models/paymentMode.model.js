const mongoose = require('mongoose');
const { PAYMENT_MODE, USER } = require('../constants/collection.constants');
const paymentModeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        is_deleted: { type: Boolean, default: false, required: false },
        deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: USER, required: false, default: null },
        deleted_at: { type: Date, required: false, default: null },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model(PAYMENT_MODE,paymentModeSchema)