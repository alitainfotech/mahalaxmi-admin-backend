const mongoose = require('mongoose');
const { BRANCH, USER } = require('../constants/collection.constants');
const branchSchema = new mongoose.Schema(
    {
        code: { type: String, required: true },
        name: { type: String, required: true },
        phone_number: { type: String, max: 15, required: true },
        address: { type: String, max: 500, required: true },
        pincode: { type: String, max: 15, required: true },
        city: { type: String, max: 100, required: true },
        state: { type: String, max: 100, required: true },
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
module.exports = mongoose.model(BRANCH,branchSchema)
