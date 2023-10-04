const { checkSchema } = require("express-validator");
const { AUTH_MESSAGES } = require("../controller_messages/auth.messages");

const loginValidationRules = () => {
  return checkSchema({
    code: {
      notEmpty: {
        errorMessage: AUTH_MESSAGES.CODE_ERROR_EMPTY,
      },
    },
    password: {
      notEmpty: {
        errorMessage: AUTH_MESSAGES.PASSWORD_ERROR_EMPTY,
      },
      isLength: {
        errorMessage: AUTH_MESSAGES.PASSWORD_LENGTH,
        options: { min: 6, max: 15 },
      },
    },
  });
};

module.exports = {
  loginValidationRules,
};
