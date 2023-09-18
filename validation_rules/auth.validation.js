const { checkSchema } = require("express-validator");
const { AUTH_MESSAGES } = require("../controller_messages/auth.messages");

const loginValidationRules = () => {
  return checkSchema({
    email: {
      notEmpty: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_EMPTY,
      },
      isEmail: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_INVALID,
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
