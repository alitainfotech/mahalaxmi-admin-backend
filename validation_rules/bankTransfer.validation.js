const { checkSchema } = require("express-validator");
const { BANKTRANSFER_MESSAGES } = require("../controller_messages/bankTransfer.messages");

const bankTransferValidationRules = () => {
    return checkSchema({
        customer: {
            notEmpty: {
                errorMessage: BANKTRANSFER_MESSAGES.EMPTY_CUSTOMER,
            }
        },
        branch: {
            notEmpty: {
                errorMessage: BANKTRANSFER_MESSAGES.EMPTY_BRANCH,
            }
        },
        bank: {
            notEmpty: {
                errorMessage: BANKTRANSFER_MESSAGES.EMPTY_BANK,
            }
        },
        payment_mode: {
            notEmpty: {
                errorMessage: BANKTRANSFER_MESSAGES.EMPTY_PAYMENT_MODE,
            }
        },
        amount: {
            notEmpty: {
                errorMessage: BANKTRANSFER_MESSAGES.EMPTY_AMOUNT
            },
            matches: {
                options: [/^\d{1,12}$/],
                errorMessage: BANKTRANSFER_MESSAGES.BANK_TRANSFER_MORE_AMOUNT,
            },
        },
        live_photo: {
            custom: {
                options: (value, { req }) => {
                    if (!req.files.live_photo) {
                        throw new Error(BANKTRANSFER_MESSAGES.EMPTY_LIVE_PHOTO);
                    }
                    return true;
                },
            },
        },
        aadhaar_card_front: {
            custom: {
                options: (value, { req }) => {
                    if (!req.files.aadhaar_card_front) {
                        throw new Error(BANKTRANSFER_MESSAGES.EMPTY_AADHAAR_CARD_FRONT);
                    }
                    return true;
                },
            },
        },
        aadhaar_card_back: {
            custom: {
                options: (value, { req }) => {
                    if (!req.files.aadhaar_card_back) {
                        throw new Error(BANKTRANSFER_MESSAGES.EMPTY_AADHAAR_CARD_BACK);
                    }
                    return true;
                },
            },
        },
        pan_card: {
            custom: {
                options: (value, { req }) => {
                    if (!req.files.pan_card) {
                        throw new Error(BANKTRANSFER_MESSAGES.EMPTY_PANCARD);
                    }
                    return true;
                },
            },
        },
        reciept_of_customer: {
            custom: {
                options: (value, { req }) => {
                    if (!req.files.reciept_of_customer) {
                        throw new Error(BANKTRANSFER_MESSAGES.EMPTY_RECIEPT_OF_CUSTOMER);
                    }
                    return true;
                },
            },
        },
        promissory_note: {
            custom: {
                options: (value, { req }) => {
                    if (!req.files.promissory_note) {
                        throw new Error(BANKTRANSFER_MESSAGES.EMPTY_PORMISSORY_NOTE);
                    }
                    return true;
                },
            },
        },
        signed_check: {
            custom: {
                options: (value, { req }) => {
                    if (!req.files.signed_check) {
                        throw new Error(BANKTRANSFER_MESSAGES.EMPTY_SIGNED_CHECK);
                    }
                    return true;
                },
            },
        },
    });
};

module.exports = {
    bankTransferValidationRules
}