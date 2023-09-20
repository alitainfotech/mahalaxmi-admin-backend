const express = require("express");
const { addRoles,
    getRolesById,
    getAllRoles,
    updateRoles,
    deleteRoles
} = require("../../controllers/role/role.controller");
const auth = require("../../middlewares/auth.guard");
const { rolesValidationRules } = require("../../validation_rules/roles.validation");
const validateApi = require("../../middlewares/validator");
const rolesRouter = express.Router();

rolesRouter.post("/addRoles", auth, rolesValidationRules(), validateApi, addRoles)
rolesRouter.get("/getAllRoles", getAllRoles)
rolesRouter.get("/:id", auth, getRolesById)
rolesRouter.put("/updateRoles/:id", auth, rolesValidationRules(), validateApi, updateRoles)
rolesRouter.put("/deleteRoles/:id", auth, deleteRoles)

module.exports = { rolesRouter }