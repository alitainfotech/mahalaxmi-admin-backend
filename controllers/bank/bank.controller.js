const {
    RESPONSE_PAYLOAD_STATUS_SUCCESS,
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_OK
} = require("../../constants/global.constants");
const { BANK_MESSAGES } = require("../../controller_messages/bank.messages");
const { getCurrentLoginUser } = require("../../helpers/fn");
const bankModel = require("../../models/bank.model");

// Add new Bank
const addBank = async (req, res) => {
    try {
        const { name } = req.body

        const existingBank = await bankModel.findOne({ name });

        if (existingBank) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BANK_MESSAGES.BANK_ALREADY_EXISTS,
                data: null,
                error: BANK_MESSAGES.BANK_ALREADY_EXISTS,
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }

        const addedBanks = await bankModel.create({
            name
        })
        if (addedBanks) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BANK_MESSAGES.BANK_ADD,
                data: addedBanks,
                error: null
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BANK_MESSAGES.BANK_NOT_ADDED,
                data: null,
                error: BANK_MESSAGES.BANK_NOT_ADDED
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
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

// Get Bank By Id
const getBankById = async (req, res) => {
    try {
        const { id } = req.params;
        let bankData = await bankModel.findById({ _id: id, is_deleted: false })
        if (bankData && bankData !== null) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BANK_MESSAGES.BANK_ID_FOUND,
                data: bankData,
                error: null
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BANK_MESSAGES.BANK_ID_NOT_FOUND,
                data: null,
                error: BANK_MESSAGES.BANK_ID_NOT_FOUND
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

// Update Bank

const updateBank = async (req, res) => {
    try {
        let { id } = req.params;
        const { name } = req.body

        const updateBank = await bankModel.findByIdAndUpdate(
            id,
            {
                name: name
            },
            { new: true }
        );

        if (updateBank) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BANK_MESSAGES.BANK_UPDATED,
                data: updateBank,
                error: BANK_MESSAGES.BANK_UPDATED,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BANK_MESSAGES.BANK_NOT_UPDATED,
                data: null,
                error: BANK_MESSAGES.BANK_NOT_UPDATED,
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
};

// Delete Bank
const deleteBank = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getCurrentLoginUser(req);

        const deleteBank = await bankModel.findByIdAndUpdate(
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
        if (deleteBank) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BANK_MESSAGES.BANK_DELETED,
                data: deleteBank,
                error: null,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BANK_MESSAGES.BANK_NOT_DELETED,
                data: null,
                error: BANK_MESSAGES.BANK_NOT_DELETED,
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

// Get all Banks
const getAllBanks = async (req, res) => {
    try {
  
      let bankData = await bankModel.find({is_deleted:false});
  
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: BANK_MESSAGES.BANK_ID_FOUND,
        data: bankData || [],
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
    addBank,
    getBankById,
    updateBank,
    deleteBank,
    getAllBanks
}