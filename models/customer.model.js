const mongoose = require('mongoose');
const { Schema } = mongoose;
const { USER, BRANCH, CUSTOMER } = require('../constants/collection.constants');
const customerSchema = new Schema(
    {
        code: { type: String, required: true },
        branch: { type: Schema.Types.ObjectId, ref: BRANCH, required: true },
        profile_photo: { type: String, max: 500, required: true },
        first_name: { type: String, max: 50, required: true },
        middle_name: { type: String, max: 50, default: null, required: false },
        last_name: { type: String, max: 50, required: true },
        address: { type: String, max: 500, required: true },
        pincode: { type: String, max: 15, required: true },
        city: { type: String, max: 100, required: true },
        state: { type: String, max: 100, required: true },
        email: { type: String, max: 120, required: true },
        phone_number: { type: String, max: 15, required: true },
        joining_date: { type: Date, default: null, required: false },
        is_deleted: { type: Boolean, default: false, required: false },
        deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: USER, required: false, default: null },
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: USER, required: false, default: null },
        updated_by: { type: mongoose.Schema.Types.ObjectId, ref: USER, required: false, default: null },
        deleted_at: { type: Date, required: false, default: null },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model(CUSTOMER,customerSchema)
