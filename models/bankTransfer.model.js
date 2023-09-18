const mongoose = require('mongoose');
const { Schema } = mongoose;
const { USER, BRANCH, BANKTRANSFER, CUSTOMER, BANK, PAYMENT_MODE } = require('../constants/collection.constants');
const { STATUS } = require('../constants/enum.constants');
const bankTransferSchema = new Schema(
    {
        code: { type: String, required: true },
        customer: { type: Schema.Types.ObjectId, ref: CUSTOMER, required: true },
        branch: { type: Schema.Types.ObjectId, ref: BRANCH, required: true },
        bank: { type: Schema.Types.ObjectId, ref: BANK, required: true },
        payment_mode: { type: Schema.Types.ObjectId, ref: PAYMENT_MODE, required: true },
        amount: { type: Number, max: 12, default: null, required: true },
        live_photo: { type: String, max: 500, required: true },
        aadhaar_card_front: { type: String, max: 500, required: true },
        aadhaar_card_back: { type: String, max: 500, required: true },
        pan_card: { type: String, max: 500, required: true },
        reciept_of_customer: { type: String, max: 500, required: true },
        promissory_note: { type: String, max: 500, required: true },
        signed_check: { type: String, max: 500, required: false, default:null },
        status: { type: String, max: 500, required: true, default:STATUS.STATUS_PENDING, enum:STATUS },
        is_deleted: { type: Boolean, default: false, required: false },
        deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: USER, required: false, default: null },
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: USER, required: false, default: null },
        updated_by: { type: mongoose.Schema.Types.ObjectId, ref: USER, required: false, default: null },
        approved_by: { type: mongoose.Schema.Types.ObjectId, ref: USER, required: false, default: null },
        deleted_at: { type: Date, required: false, default: null },
        approved_at: { type: Date, required: false, default: null },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model(BANKTRANSFER,bankTransferSchema)
