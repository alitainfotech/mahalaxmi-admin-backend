const express = require("express");
const {
    addCustomer,
    updateCustomer,
    getCustomerById,
    getAllCustomer,
    deleteCustomer
} = require("../../controllers/customer/customer.controller");
const { customerValidationRules } = require("../../validation_rules/customer.validation");
const validateApi = require("../../middlewares/validator");
const auth = require("../../middlewares/auth.guard");
const customerRouter = express.Router();

customerRouter.post("/addCustomer", customerValidationRules(), validateApi, addCustomer)
customerRouter.put("/updateCustomer/:id", updateCustomer)
customerRouter.get("/getCustomer/:id", getCustomerById)
customerRouter.put("/deleteCustomer/:id", deleteCustomer)
customerRouter.get("/getAllCustomer", getAllCustomer)

module.exports = {
    customerRouter
}