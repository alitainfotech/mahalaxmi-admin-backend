const express = require("express");
const {
    addPaymentMode,
    getPaymentMode,
    updatePaymentMode,
    deletePaymentMode,
    getAllPaymentMode
} = require("../../controllers/payment_mode/payment_mode.controller");
const auth = require("../../middlewares/auth.guard");
const { paymentModeValidationRules } = require("../../validation_rules/payment_mode.validation");
const validateApi = require("../../middlewares/validator");
const payment_modeRouter = express.Router()

payment_modeRouter.post("/addPaymentMode", auth, paymentModeValidationRules(), validateApi, addPaymentMode)
payment_modeRouter.get("/getAllPaymentMode", auth, getAllPaymentMode)
payment_modeRouter.get("/:id", auth, getPaymentMode)
payment_modeRouter.put("/updatePaymentMode/:id", auth, paymentModeValidationRules(), validateApi, updatePaymentMode)
payment_modeRouter.put("/deletePaymentMode/:id", auth, deletePaymentMode)

module.exports = {
    payment_modeRouter
}