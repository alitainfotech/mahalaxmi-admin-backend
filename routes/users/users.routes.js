const express = require("express");
const {
    addUsers,
    getUserById,
    updateUser,
    deleteUsers,
    changePasswordByAdmin,
    getAllUsers,
} = require("../../controllers/user/user.controller");
const { usersValidationRules, updateUsersValidationRules } = require("../../validation_rules/user.validation");
const validateApi = require("../../middlewares/validator");
const auth = require("../../middlewares/auth.guard");
const userRouters = express.Router()

userRouters.post("/add", usersValidationRules(), validateApi, addUsers)
userRouters.put("/updateUsers/:id", auth, updateUsersValidationRules(), validateApi, updateUser)
userRouters.put("/deleteUsers/:id", auth, deleteUsers)
userRouters.put("/changePassword/:id", changePasswordByAdmin)
userRouters.get("/getAllUsers", auth, getAllUsers)
userRouters.get("/:id", auth, getUserById)

module.exports = {
    userRouters
}