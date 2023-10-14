const { checkSchema } = require("express-validator");
const { USERS_MESSAGES } = require("../controller_messages/users.messages");

const usersValidationRules = () => {
    return checkSchema({
        role: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_ROLES,
            }
        },
        branch: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_BRANCH,
            }
        },
        designation: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_DESIGNATION,
            }
        },
        first_name: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_FIRST_NAME,
            },
            matches: {
                options: [/^[A-Za-z]{2,}$/],
                errorMessage: USERS_MESSAGES.MORE_CHARACTERS,
            },
        },
        middle_name: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_MIDDLE_NAME,
            },
            matches: {
                options: [/^[A-Za-z]{2,}$/],
                errorMessage: USERS_MESSAGES.MORE_CHARACTERS,
            },
        },
        last_name: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_LAST_NAME,
            },
            matches: {
                options: [/^[A-Za-z]{2,}$/],
                errorMessage: USERS_MESSAGES.MORE_CHARACTERS,
            },
        },
        email: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_EMAIL,
            },
            isEmail: {
                errorMessage: USERS_MESSAGES.EMAIL_ERROR_INVALID,
              },
        },
        password: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_PASSWORD,
            },
            matches: {
                options: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/],
                errorMessage: USERS_MESSAGES.IN_VALID_PASSWORD_TYPE,
              },
        },
        phone_number: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_PHONE_NUMBER,
            },
            matches: {
                options: [
                  /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
                ],
                errorMessage: USERS_MESSAGES.PHONE_NUMBER_MASSAGE,
              },
        },
        // profile_photo: {
        //     notEmpty: {
        //         errorMessage: USERS_MESSAGES.EMPTY_PROFILE_PHOTO,
        //     }
        // },
        address: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_ADDRESS,
            }
        },
        city: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_CITY,
            }
        },
        state: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_STATE,
            }
        },
        gender: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_GENDER,
            }
        },
        dob: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_DOB,
            }
        },
        joining_date: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_JOINING_DATE,
            }
        },
        salary: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_SALARY,
            }
        },
        account_number: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_AC_NUMBER,
            }
        },
        ifsc_code: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_IFSC,
            }
        },
        holder_name: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_HOLDER_NAME,
            }
        },
    });
};

const updateUsersValidationRules = () => {
    return checkSchema({
        role: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_ROLES,
            }
        },
        branch: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_BRANCH,
            }
        },
        designation: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_DESIGNATION,
            }
        },
        first_name: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_FIRST_NAME,
            },
            matches: {
                options: [/^[A-Za-z]{2,}$/],
                errorMessage: USERS_MESSAGES.MORE_CHARACTERS,
            },
        },
        middle_name: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_MIDDLE_NAME,
            },
            matches: {
                options: [/^[A-Za-z]{2,}$/],
                errorMessage: USERS_MESSAGES.MORE_CHARACTERS,
            },
        },
        last_name: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_LAST_NAME,
            },
            matches: {
                options: [/^[A-Za-z]{2,}$/],
                errorMessage: USERS_MESSAGES.MORE_CHARACTERS,
            },
        },
        phone_number: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_PHONE_NUMBER,
            },
            matches: {
                options: [
                  /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
                ],
                errorMessage: USERS_MESSAGES.PHONE_NUMBER_MASSAGE,
              },
        },
        // profile_photo: {
        //     notEmpty: {
        //         errorMessage: USERS_MESSAGES.EMPTY_PROFILE_PHOTO,
        //     }
        // },
        address: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_ADDRESS,
            }
        },
        city: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_CITY,
            }
        },
        state: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_STATE,
            }
        },
        gender: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_GENDER,
            }
        },
        dob: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_DOB,
            }
        },
        joining_date: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_JOINING_DATE,
            }
        },
        salary: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_SALARY,
            }
        },
        account_number: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_AC_NUMBER,
            }
        },
        ifsc_code: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_IFSC,
            }
        },
        holder_name: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMPTY_HOLDER_NAME,
            }
        },
    });
};

module.exports = {
    usersValidationRules,
    updateUsersValidationRules
};