const express = require("express");
const {
    addBankTransfer,
    updateBankTransfer,
    deleteBankTransfer,
    getAllBankTransfer,
    getBankTransferById,
    statusUpdateForApprove,
    statusUpdateForReject,
    otpHandler,
    otpVerification
} = require("../../controllers/bankTransfer/bankTransfer.controller");
const { bankTransferValidationRules } = require("../../validation_rules/bankTransfer.validation");
const validateApi = require("../../middlewares/validator");
const auth = require("../../middlewares/auth.guard");
const bankTransferRouter = express.Router()

bankTransferRouter.post("/addBankTransfer", bankTransferValidationRules(), validateApi, addBankTransfer)
bankTransferRouter.put("/updateBankTransfer/:id", auth, bankTransferValidationRules(), validateApi, updateBankTransfer)
bankTransferRouter.put("/deleteBankTransfer/:id", auth, deleteBankTransfer)
bankTransferRouter.put("/statusUpdateForApprove/:id", auth, statusUpdateForApprove)
bankTransferRouter.put("/statusUpdateForReject/:id", auth, statusUpdateForReject)
bankTransferRouter.get("/getAllBankTransfer", auth, getAllBankTransfer)
bankTransferRouter.post("/otp", otpHandler)
bankTransferRouter.get("/otpVerification", otpVerification)
bankTransferRouter.get("/:id", auth, getBankTransferById)

module.exports = {
    bankTransferRouter
}