const {
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_CODE_OK,
    RESPONSE_PAYLOAD_STATUS_SUCCESS,
    RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR
} = require("../../constants/global.constants");
const { BRANCH_MESSAGES } = require("../../controller_messages/branch.messages");
const { getCurrentLoginUser } = require("../../helpers/fn");
const branchModel = require("../../models/branch.model")

// add new branch
const addBranch = async (req, res) => {
    try {
        const { code, name, phone_number, address, pincode, city, state } = req.body

        const existingBranch = await branchModel.findOne({ $or: [{ code }, { name }] });

        if (existingBranch) {
            if (existingBranch.code === code) {
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_ERROR,
                    message: BRANCH_MESSAGES.BRANCH_CODE_ALREADY_EXISTS,
                    data: null,
                    error: BRANCH_MESSAGES.BRANCH_CODE_ALREADY_EXISTS
                };
                return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
            } else {
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_ERROR,
                    message: BRANCH_MESSAGES.BRANCH_NAME_ALREADY_EXISTS,
                    data: null,
                    error: BRANCH_MESSAGES.BRANCH_NAME_ALREADY_EXISTS
                };
                return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
            }
        }

        const addbranches = await branchModel.create({
            code,
            name,
            phone_number,
            address,
            pincode,
            city,
            state
        })
        if (addbranches) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BRANCH_MESSAGES.BRANCH_ADD,
                data: addbranches,
                error: null
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BRANCH_MESSAGES.BRANCH_NOT_ADDED,
                data: null,
                error: BRANCH_MESSAGES.BRANCH_NOT_ADDED
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
        };
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);

    }
}


// get branch by id
const getBranchById = async (req, res) => {
    try {
        const { id } = req.params

        const getBranches = await branchModel.findById(id)

        if (getBranches) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BRANCH_MESSAGES.BRANCH_ID_FOUND,
                data: getBranches,
                error: null
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BRANCH_MESSAGES.BRANCH_ID_NOT_FOUND,
                data: null,
                error: BRANCH_MESSAGES.BRANCH_ID_NOT_FOUND
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
        };
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);

    }
}


// Update Branches
const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, name, phone_number, address, pincode, city, state } = req.body

        const updateBranches = await branchModel.findByIdAndUpdate(
            id,
            {
                code: code,
                name: name,
                phone_number: phone_number,
                address: address,
                pincode: pincode,
                city: city,
                state: state
            },
            { new: true }
        );

        if (updateBranches) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BRANCH_MESSAGES.BRANCH_UPDATED,
                data: updateBranches,
                error: BRANCH_MESSAGES.BRANCH_UPDATED,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BRANCH_MESSAGES.BRANCH_NOT_UPDATED,
                data: null,
                error: BRANCH_MESSAGES.BRANCH_NOT_UPDATED,
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

// delete branches
const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getCurrentLoginUser(req);

        const deleteBranches = await branchModel.findByIdAndUpdate(
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
        if (deleteBranches) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BRANCH_MESSAGES.BRANCH_DELETED,
                data: deleteBranches,
                error: null,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BRANCH_MESSAGES.BRANCH_NOT_DELETED,
                data: null,
                error: BRANCH_MESSAGES.BRANCH_NOT_DELETED,
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

const getAllBranches = async (req, res) => {
    try {

        let branchData = await branchModel.find({ is_deleted: false });

        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
            message: BRANCH_MESSAGES.BRANCH_ID_FOUND,
            data: branchData || [],
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
    addBranch,
    getBranchById,
    updateBranch,
    deleteBranch,
    getAllBranches
}