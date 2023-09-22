const { checkSchema } = require("express-validator");
const { DESIGNATION_MESSAGES } = require("../controller_messages/designation.messages");

const designationValidationRules = () => {
    return checkSchema({
        name: {
            notEmpty: {
                errorMessage: DESIGNATION_MESSAGES.DESIGNATION_ERROR_EMPTY,
            }
        }
    });
};

module.exports = {
    designationValidationRules,
};