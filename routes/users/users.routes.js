const express = require("express");
const {
    addUsers,
    getUserById,
    updateUser,
    deleteUsers,
    changePasswordByAdmin,
    getAllUsers
} = require("../../controllers/user/user.controller");
const { usersValidationRules } = require("../../validation_rules/user.validation");
const validateApi = require("../../middlewares/validator");
const auth = require("../../middlewares/auth.guard");
const { uploadProfileImage } = require("../../services/fileUpload");
const userRouters = express.Router()

userRouters.post("/add", uploadProfileImage.single("profile_photo"), usersValidationRules(), validateApi, addUsers)
userRouters.put("/updateUsers/:id", auth, usersValidationRules(), validateApi, updateUser)
userRouters.put("/deleteUsers/:id", auth, deleteUsers)
userRouters.put("/changePassword/:id", changePasswordByAdmin)
userRouters.get("/getAllUsers", auth, getAllUsers)
userRouters.get("/:id", auth, getUserById)

module.exports = {
    userRouters
}