const { checkSchema } = require("express-validator");
const { BANK_MESSAGES } = require("../controller_messages/bank.messages");

const bankValidationRules = () => {
    return checkSchema({
        name: {
            notEmpty: {
                errorMessage: BANK_MESSAGES.BANK_ERROR_EMPTY,
            }
        }
    });
};

module.exports = {
    bankValidationRules,
};