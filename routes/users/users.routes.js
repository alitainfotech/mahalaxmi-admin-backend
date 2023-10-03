const express = require("express");
const {
    addUsers,
    getUserById,
    updateUser,
    deleteUsers
} = require("../../controllers/user/user.controller");
const { usersValidationRules } = require("../../validation_rules/user.validation");
const validateApi = require("../../middlewares/validator");
const auth = require("../../middlewares/auth.guard");
const { uploadProfileImage } = require("../../services/fileUpload");
const userRouters = express.Router()

userRouters.post("/add", uploadProfileImage.single("profile_photo"), usersValidationRules(), validateApi, addUsers)
userRouters.put("/updateUsers/:id", auth, usersValidationRules(), validateApi, updateUser)
userRouters.put("/deleteUsers/:id", auth, deleteUsers)
userRouters.get("/:id", getUserById)

module.exports = {
    userRouters
}