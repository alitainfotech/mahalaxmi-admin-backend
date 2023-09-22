const express = require("express")
const {
    addDesignation,
    getDesignation,
    updateDesignation,
    deleteDesignation,
    getAllDesignation
} = require("../../controllers/designation/designation.controller")
const auth = require("../../middlewares/auth.guard")
const { designationValidationRules } = require("../../validation_rules/designation.validation")
const validateApi = require("../../middlewares/validator")
const designationRouter = express.Router()

designationRouter.post("/addDesignation", auth, designationValidationRules(), validateApi, addDesignation)
designationRouter.get("/", auth, getAllDesignation)
designationRouter.get("/:id", auth, getDesignation)
designationRouter.put("/updateDesignation/:id", auth, designationValidationRules(), validateApi, updateDesignation)
designationRouter.put("/deleteDesignation/:id", auth, deleteDesignation)

module.exports = {
    designationRouter
}