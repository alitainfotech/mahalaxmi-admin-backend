const mongoose = require('mongoose');
const { Schema } = mongoose;
const { USER, ROLE, BRANCH, DESIGNATION } = require('../constants/collection.constants');
const userSchema = new Schema(
    {
        code: { type: String, required: true },
        role: { type: Schema.Types.ObjectId, ref: ROLE, required: true },
        branch: { type: Schema.Types.ObjectId, ref: BRANCH, required: true },
        designation: { type: Schema.Types.ObjectId, ref: DESIGNATION, required: true },
        first_name: { type: String, max: 50, required: true },
        middle_name: { type: String, max: 50, default: null, required: false },
        last_name: { type: String, max: 50, required: true },
        email: { type: String, max: 120, required: true },
        password: { type: String, max: 255, default: null, required: true },
        phone_number: { type: String, max: 15, required: true },
        profile_photo: { type: String, max: 500 },
        address: { type: String, max: 500, default: null, required: false },
        city: { type: String, max: 500, default: null, required: false },
        state: { type: String, max: 500, default: null, required: false },
        gender: { type: String, max: 10, default: null, required: false, },
        dob: { type: Date, default: null, required: false },
        joining_date: { type: Date, default: null, required: false },
        salary: { type: Number, max: 12, default: null, required: false },
        account_number: { type: String, max: 100, default: null, required: false },
        ifsc_code: { type: String, max: 100, default: null, required: false },
        holder_name: { type: String, max: 200, default: null, required: false },
        token: { type: String, max: 500, default: null, required: false },
        reset_password_token: { type: String, max: 500, default: null, required: false },
        reset_password_token_expiry_date: { type: Date, required: false },
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
module.exports = mongoose.model(USER,userSchema)
