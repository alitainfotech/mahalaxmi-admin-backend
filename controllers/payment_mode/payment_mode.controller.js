const {
    RESPONSE_PAYLOAD_STATUS_SUCCESS, RESPONSE_STATUS_CODE_OK, RESPONSE_PAYLOAD_STATUS_ERROR, RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR, RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR
} = require("../../constants/global.constants")
const { PAYMENT_MODE_MESSAGES } = require("../../controller_messages/payment_mode.messages")
const { getCurrentLoginUser } = require("../../helpers/fn")
const paymentModeModel = require("../../models/paymentMode.model")


// add new payment
const addPaymentMode = async (req, res) => {
    try {
        const { name } = req.body

        const existingPaymentMode = await paymentModeModel.findOne({ name });

        if (existingPaymentMode) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_ALREADY_EXISTS,
                data: null,
                error: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_ALREADY_EXISTS,
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }

        const addPaymentModes = await paymentModeModel.create({
            name
        })

        if (addPaymentModes) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_ADD,
                data: addPaymentModes,
                error: null
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_NOT_ADDED,
                data: null,
                error: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_NOT_ADDED
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        }
    } catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
        }
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)
    }
}

// Get Payment mode By Id
const getPaymentMode = async (req, res) => {
    try {
        const { id } = req.params
        const getPaymentModes = await paymentModeModel.findById({ _id: id, is_deleted: false })

        if (getPaymentModes && getPaymentModes !== null) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_ID_FOUND,
                data: getPaymentModes,
                error: null
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_ID_NOT_FOUND,
                data: null,
                error: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_ID_NOT_FOUND
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        };
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
}

// Update Payment Mode
const updatePaymentMode = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body
        const updatePaymentMode = await paymentModeModel.findByIdAndUpdate(
            id,
            {
                name: name
            },
            { new: true }
        );
        if (updatePaymentMode) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_UPDATED,
                data: updatePaymentMode,
                error: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_UPDATED,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_NOT_UPDATED,
                data: null,
                error: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_NOT_UPDATED,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        };
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
}

// Delete Payment Mode
const deletePaymentMode = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getCurrentLoginUser(req);

        const deletePaymentModes = await paymentModeModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    is_deleted: true,
                    deleted_by: user._id,
                    deleted_at: new Date()
                }
            },
            { new: true }
        )
        if (deletePaymentModes) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_DELETED,
                data: deletePaymentModes,
                error: null,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_NOT_DELETED,
                data: null,
                error: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_NOT_DELETED,
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        };
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
}

// Get all Payment Mode
const getAllPaymentMode = async (req, res) => {
    try {

        let paymentModeData = await paymentModeModel.find({ is_deleted: false });

        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
            message: PAYMENT_MODE_MESSAGES.PAYMENT_MODE_ID_FOUND,
            data: paymentModeData || [],
            error: null,
        };

        return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        };

        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);
    }
};



module.exports = {
    addPaymentMode,
    getPaymentMode,
    updatePaymentMode,
    deletePaymentMode,
    getAllPaymentMode
}