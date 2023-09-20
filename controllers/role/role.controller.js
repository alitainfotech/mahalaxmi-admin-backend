const {
    RESPONSE_STATUS_CODE_OK,
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
    RESPONSE_PAYLOAD_STATUS_SUCCESS
} = require("../../constants/global.constants")

const { ROLE_MESSAGES } = require("../../controller_messages/role.messages")
const { getCurrentLoginUser } = require("../../helpers/fn")
const roleModel = require("../../models/role.model")

// Add new Roles
const addRoles = async (req, res) => {
    try {
        const { name, roles } = req.body

        const addedRoles = await roleModel.create({
            name,
            roles
        })
        if (addedRoles) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: ROLE_MESSAGES.ROLE_ADD,
                data: addedRoles,
                error: null
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: ROLE_MESSAGES.ROLE_NOT_ADDED,
                data: null,
                error: ROLE_MESSAGES.ROLE_NOT_ADDED
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

// Get Roles By Id
const getRolesById = async (req, res) => {
    try {
        const { id } = req.params;
        let rolesData = await roleModel.findById({ _id: id, is_deleted: false })
        if (rolesData && rolesData !== null) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: ROLE_MESSAGES.ROLE_ID_FOUND,
                data: rolesData,
                error: null
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: ROLE_MESSAGES.ROLE_ID_NOT_FOUND,
                data: null,
                error: ROLE_MESSAGES.ROLE_ID_NOT_FOUND
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

// Get All Roles details
// const getAllRoles = async (req, res) => {
//     try {
//         const rolesData = await roleModel.find();
//         console.log("rolesData", rolesData);

//         if (rolesData && rolesData.length > 0) {

//             const activeRolesData = rolesData.filter(role => !role.is_deleted);

//             const responsePayload = {
//                 status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//                 message: ROLE_MESSAGES.ROLE_ID_FOUND,
//                 data: rolesData,
//                 error: null,
//             };

//             return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//         } else {
//             const responsePayload = {
//                 status: RESPONSE_PAYLOAD_STATUS_ERROR,
//                 message: ROLE_MESSAGES.ROLE_ID_NOT_FOUND,
//                 data: null,
//                 error: ROLE_MESSAGES.ROLE_ID_NOT_FOUND,
//             };

//             return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//         }
//     }
//     catch (err) {
//         console.log(err);
//         const responsePayload = {
//             status: RESPONSE_PAYLOAD_STATUS_ERROR,
//             message: null,
//             data: null,
//             error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//         };

//         return res
//             .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//             .json(responsePayload);
//     }
// }

const getAllRoles = async (req, res) => {
    try {
        const rolesData = await roleModel.find();
        // console.log("rolesData", rolesData);

        if (rolesData && rolesData.length > 0) {
            const activeRolesData = rolesData.filter(role => !role.is_deleted);
            console.log(activeRolesData);

            if (activeRolesData.length > 0) {
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                    message: ROLE_MESSAGES.ROLE_ID_FOUND,
                    data: activeRolesData,
                    error: null,
                };

                return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
            } else {
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_ERROR,
                    message: ROLE_MESSAGES.ROLE_ID_NOT_FOUND,
                    data: null,
                    error: ROLE_MESSAGES.ROLE_ID_NOT_FOUND,
                };

                return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
            }
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: ROLE_MESSAGES.ROLE_ID_NOT_FOUND,
                data: null,
                error: ROLE_MESSAGES.ROLE_ID_NOT_FOUND,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        console.log(err);
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


// Update Roles
const updateRoles = async (req, res) => {
    try {
        let { id } = req.params;
        const { name, roles } = req.body

        const updateRoles = await roleModel.findByIdAndUpdate(
            id,
            {
                name: name,
                roles: roles
            },
            { new: true }
        );

        if (updateRoles) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: ROLE_MESSAGES.ROLE_UPDATED,
                data: updateRoles,
                error: ROLE_MESSAGES.ROLE_UPDATED,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: ROLE_MESSAGES.ROLE_NOT_UPDATED,
                data: null,
                error: ROLE_MESSAGES.ROLE_NOT_UPDATED,
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

// Delete Roles
const deleteRoles = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getCurrentLoginUser(req);

        const deleteRoles = await roleModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    'roles.$[].is_deleted': true,
                    'roles.$[].deleted_by': user._id,
                    'roles.$[].deleted_at': new Date()
                }
            },
            { new: true }
        )
        if (deleteRoles) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: ROLE_MESSAGES.ROLE_DELETED,
                data: deleteRoles,
                error: null,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: ROLE_MESSAGES.ROLE_NOT_DELETED,
                data: null,
                error: ROLE_MESSAGES.ROLE_NOT_DELETED,
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        console.log(err);
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

module.exports = {
    addRoles,
    getRolesById,
    getAllRoles,
    updateRoles,
    deleteRoles
}