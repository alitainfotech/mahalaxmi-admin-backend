const express = require("express")
const auth = require("../../middlewares/auth.guard")
const {
    addBranch,
    getBranchById,
    updateBranch,
    deleteBranch,
    getAllBranches,
} = require("../../controllers/branch/branch.controller")

const { branchValidationRules } = require("../../validation_rules/branch.validation")
const validateApi = require("../../middlewares/validator")
const branchRouter = express.Router()

branchRouter.post("/addBranch", auth, branchValidationRules(), validateApi, addBranch)
branchRouter.get("/getAllBranch", auth, getAllBranches)
branchRouter.get("/:id", auth, getBranchById)
branchRouter.put("/updateBranch/:id", auth, branchValidationRules(), validateApi, updateBranch)
branchRouter.put("/deleteBranch/:id", auth, deleteBranch)

module.exports = {
    branchRouter
}