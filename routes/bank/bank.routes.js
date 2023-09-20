const express = require("express")
const auth = require("../../middlewares/auth.guard")
const {
    addBank,
    getBankById,
    updateBank,
    deleteBank,
    getAllBanks
} = require("../../controllers/bank/bank.controller")
const { bankValidationRules } = require("../../validation_rules/bank.validation")
const validateApi = require("../../middlewares/validator")

const bankRouter = express.Router()

bankRouter.post("/addBank", auth, bankValidationRules(), validateApi, addBank)
bankRouter.get("/getAllBank", auth, getAllBanks)
bankRouter.get("/:id", auth, getBankById)
bankRouter.put("/updateBank/:id", auth, bankValidationRules(), validateApi, updateBank)
bankRouter.put("/deleteBank/:id", auth, deleteBank)

module.exports = {
    bankRouter
}