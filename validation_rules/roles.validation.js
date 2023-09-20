const { checkSchema } = require("express-validator");
const { ROLE_MESSAGES } = require("../controller_messages/role.messages");

const rolesValidationRules = () => {
    return checkSchema({
        name: {
            notEmpty: {
                errorMessage: ROLE_MESSAGES.ROLES_NAME_ERROR_EMPTY,
            },
        },
        roles: {
            notEmpty: {
                errorMessage: ROLE_MESSAGES.ROLES_ERROR_EMPTY,
            },
            custom: {
                options: (value) => {
                    if (!Array.isArray(value) || value.length === 0) {
                        throw new Error(ROLE_MESSAGES.ROLES_ERROR_EMPTY);
                    }
                    value.map((role) => {
                        if (!role.db || !Array.isArray(role.action) || role.action.length === 0) {
                            throw new Error('Each role must have a "db" and a non-empty "action" array');
                        }
                    });
                    return true;
                },
            },
        },
    });
};

module.exports = {
    rolesValidationRules,
};