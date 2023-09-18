const { checkSchema } = require("express-validator");
const { AUTH_MESSAGES } = require("../controller_messages/auth.messages");

const ChangePasswordValidationRules = () => {
  return checkSchema({
    old_password: {
      notEmpty: {
        errorMessage: AUTH_MESSAGES.OLD_PASSWORD_REQUIRED,
      },
    },
    new_password: {
      notEmpty: {
        errorMessage: AUTH_MESSAGES.NEW_PASSWORD_REQUIRED,
      },
      matches: {
        options: [/^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*]{6,15}$/],
        errorMessage: AUTH_MESSAGES.IN_VALID_PASSWORD_TYPE,
      },
    },
  });
};

module.exports = {
  ChangePasswordValidationRules,
};
