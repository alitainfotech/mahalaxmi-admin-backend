const { checkSchema } = require("express-validator");
const { CUSTOMER_MESSAGES } = require("../controller_messages/customer.messages");

const customerValidationRules = () => {
    return checkSchema({
        branch: {
            notEmpty: {
                errorMessage: CUSTOMER_MESSAGES.EMPTY_BRANCH,
            }
        },
        profile_photo: {
            custom: {
                options: (value, { req }) => {
                    if (!req.files || !req.files.profile_photo) {
                        throw new Error(CUSTOMER_MESSAGES.EMPTY_PROFILE_PHOTO);
                    }
                    return true;
                },
            },
        },
        first_name: {
            notEmpty: {
                errorMessage: CUSTOMER_MESSAGES.EMPTY_FIRST_NAME,
            },
            matches: {
                options: [/^[A-Za-z]{2,}$/],
                errorMessage: CUSTOMER_MESSAGES.MORE_CHARACTERS,
            },
        },
        middle_name: {
            notEmpty: {
                errorMessage: CUSTOMER_MESSAGES.EMPTY_MIDDLE_NAME,
            },
            matches: {
                options: [/^[A-Za-z]{2,}$/],
                errorMessage: CUSTOMER_MESSAGES.MORE_CHARACTERS,
            },
        },
        last_name: {
            notEmpty: {
                errorMessage: CUSTOMER_MESSAGES.EMPTY_LAST_NAME,
            },
            matches: {
                options: [/^[A-Za-z]{2,}$/],
                errorMessage: CUSTOMER_MESSAGES.MORE_CHARACTERS,
            },
        },
        address: {
            notEmpty: {
                errorMessage: CUSTOMER_MESSAGES.EMPTY_ADDRESS,
            }
        },
        pincode: {
            notEmpty: {
                errorMessage: CUSTOMER_MESSAGES.EMPTY_PINCODE,
            },
            matches: {
                options: [/^[0-9]{6}$/],
                errorMessage: CUSTOMER_MESSAGES.PINCODE_INVALID,
            },
        },
        city: {
            notEmpty: {
                errorMessage: CUSTOMER_MESSAGES.EMPTY_CITY,
            }
        },
        state: {
            notEmpty: {
                errorMessage: CUSTOMER_MESSAGES.EMPTY_STATE,
            }
        },
        email: {
            notEmpty: {
                errorMessage: CUSTOMER_MESSAGES.EMPTY_EMAIL,
            },
            isEmail: {
                errorMessage: CUSTOMER_MESSAGES.EMAIL_ERROR_INVALID,
            },
        },
        phone_number: {
            notEmpty: {
                errorMessage: CUSTOMER_MESSAGES.EMPTY_PHONE_NUMBER,
            },
            matches: {
                options: [
                    /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
                ],
                errorMessage: CUSTOMER_MESSAGES.PHONE_NUMBER_MASSAGE,
            },
        },
        joining_date: {
            notEmpty: {
                errorMessage: CUSTOMER_MESSAGES.EMPTY_JOINING_DATE,
            }
        }
    });
};

module.exports = {
    customerValidationRules
}