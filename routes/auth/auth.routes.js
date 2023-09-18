const express = require("express");
const authRouters = express.Router();

const auth = require("../../middlewares/auth.guard");
const validateApi = require("../../middlewares/validator");

const {
  loginValidationRules,
} = require("../../validation_rules/auth.validation");
const {
  login,
  logout,
  // resetPassword,
  // changePassword,
  // forgotPassword,
  // checkResetPasswordToken,
} = require("../../controllers/auth/auth.controller");
authRouters.post("/login", loginValidationRules(), validateApi, login);

authRouters.get("/logout", auth, logout);

// authRouters.post(
//   "/reset-password",
//   resetPasswordValidationRules(),
//   validateApi,
//   resetPassword
// );

// authRouters.post(
//   "/change-password",
//   ChangePasswordValidationRules(),
//   validateApi,
//   auth,
//   changePassword
// );

// authRouters.post(
//   "/forgot-password",
//   forgotPasswordValidationRules(),
//   validateApi,
//   forgotPassword
// );

// authRouters.get("/reset-password", checkResetPasswordToken);

module.exports = { authRouters };
