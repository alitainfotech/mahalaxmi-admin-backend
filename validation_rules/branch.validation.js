const { checkSchema } = require("express-validator");
const { BRANCH_MESSAGES } = require("../controller_messages/branch.messages");

const branchValidationRules = () => {
    return checkSchema({
        code: {
            notEmpty: {
                errorMessage: BRANCH_MESSAGES.BRANCH_CODE_EMPTY,
            }
        },
        name: {
            notEmpty: {
                errorMessage: BRANCH_MESSAGES.BRANCH_NAME_EMPTY,
            }
        },
        phone_number: {
            notEmpty: {
                errorMessage: BRANCH_MESSAGES.BRANCH_PHONE_NUMBER_EMPTY,
            },
            matches: {
                options: [
                    /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
                ],
                errorMessage: BRANCH_MESSAGES.PHONE_NUMBER_MASSAGE,
            },
        },
        address: {
            notEmpty: {
                errorMessage: BRANCH_MESSAGES.BRANCH_ADDRESS_EMPTY,
            }
        },
        pincode: {
            notEmpty: {
                errorMessage: BRANCH_MESSAGES.BRANCH_PINCODE_EMPTY,
            },
            matches: {
                options: [/^[0-9]{6}$/],
                errorMessage: BRANCH_MESSAGES.PIN_CODE_REQUIRED,
              },
        },
        city: {
            notEmpty: {
                errorMessage: BRANCH_MESSAGES.BRANCH_CITY_EMPTY,
            }
        },
        state: {
            notEmpty: {
                errorMessage: BRANCH_MESSAGES.BRANCH_STATE_EMPTY,
            }
        }
    });
};

module.exports = {
    branchValidationRules,
};