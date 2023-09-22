const { checkSchema } = require("express-validator");
const { PAYMENT_MODE_MESSAGES } = require("../controller_messages/payment_mode.messages");

const paymentModeValidationRules = () => {
    return checkSchema({
        name: {
            notEmpty: {
                errorMessage: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_ERROR_EMPTY,
            }
        }
    });
};

module.exports = {
    paymentModeValidationRules,
};