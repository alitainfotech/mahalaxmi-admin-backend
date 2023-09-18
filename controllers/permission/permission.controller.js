const { default: mongoose } = require("mongoose");


const {
  RESPONSE_PAYLOAD_STATUS_SUCCESS,
  RESPONSE_PAYLOAD_STATUS_ERROR,
  RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_CODE_VALIDATION_ERROR,
  RESPONSE_STATUS_CODE_OK,
} = require("../../constants/global.constants");
const permissionModel = require("../../models/permission.model");

const { getCurrentLoginUser } = require("../../helpers/fn");
const { PERMISSION_MESSAGES } = require("../../controller_messages/permission.messages");

// Add new permission
const addPermission = async (req, res) => {
  try {
    let { db,action } = req.body;
    const existingDb = await permissionModel.findOne({
        db: db,
        is_deleted: false
    });
    if(existingDb){
        const updatedPermission = await permissionModel.findByIdAndUpdate(existingDb._id,
            { "$addToSet": { "action": action } }
        )
        if (updatedPermission) {
            const responsePayload = {
                status: 1,
                message: PERMISSION_MESSAGES.PERMISSION_ADD,
                data: updatedPermission,
                error: null,
            };
        
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: 0,
                message: PERMISSION_MESSAGES.PERMISSION_NOT_ADDED,
                data: null,
                error: PERMISSION_MESSAGES.PERMISSION_NOT_ADDED,
            };
    
            return res.status(400).json(responsePayload);
        }
    }
    else{
        const addedPermission = await permissionModel.create(req.body);
        if (addedPermission) {
            const responsePayload = {
                status: 1,
                message: PERMISSION_MESSAGES.PERMISSION_ADD,
                data: addedPermission,
                error: null,
            };
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: 0,
                message: PERMISSION_MESSAGES.PERMISSION_NOT_ADDED,
                data: null,
                error: PERMISSION_MESSAGES.PERMISSION_NOT_ADDED,
            };
            return res.status(400).json(responsePayload);
        }
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

// Get Permission By Id 
const getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    let permissionData = await permissionModel.findOne({ _id: id , is_deleted: false });
    if (permissionData && permissionData !== null) {
        const responsePayload = {
            status: 1,
            message: PERMISSION_MESSAGES.PERMISSION_ID_FOUND,
            data: permissionData,
            error: null,
        };
        return res.status(200).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: PERMISSION_MESSAGES.PERMISSION_ID_NOT_FOUND,
        data: null,
        error: PERMISSION_MESSAGES.PERMISSION_ID_NOT_FOUND,
      };

      return res.status(200).json(responsePayload);
    }
  } catch (err) {
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
      data: null,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    };

    return res.status(500).json(responsePayload);
  }
};

// Get All Permission details
const getAllPermissions = async (req, res) => {
  try {

    let permissionData = await permissionModel.find({is_deleted:false});

    const responsePayload = {
      status: 1,
      message: PERMISSION_MESSAGES.PERMISSION_ID_FOUND,
      data: permissionData || [],
      error: null,
    };

    return res.status(200).json(responsePayload);
  } catch (err) {
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: null,
      data: null,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    };

    return res.status(500).json(responsePayload);
  }
};

// Update Board
const updatePermission = async (req, res) => {
  try {
    let { id } = req.params;
    let { db, action } = req.body;

    const updatedPermission = await permissionModel.findByIdAndUpdate(
      id,
      {
        db:db,
        action:action
      }
    );

    if (updatedPermission) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: PERMISSION_MESSAGES.PERMISSION_UPDATED,
        data: updatedPermission,
        error: PERMISSION_MESSAGES.PERMISSION_UPDATED,
      };

      return res.status(200).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: PERMISSION_MESSAGES.PERMISSION_NOT_UPDATED,
        data: null,
        error: PERMISSION_MESSAGES.PERMISSION_NOT_UPDATED,
      };

      return res.status(200).json(responsePayload);
    }
  } catch (err) {
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: null,
      data: null,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    };
    return res.status(500).json(responsePayload);
  }
};

// Delete Board
const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getCurrentLoginUser(req);

    const deletedPermission = await Board.findByIdAndUpdate(id,{ 
        is_deleted: true,
        deleted_by: user._id,
        deleted_at: new Date()
    });

    if (deletedPermission) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: PERMISSION_MESSAGES.PERMISSION_DELETED,
        data: null,
        error: null,
      };

      return res.status(200).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: PERMISSION_MESSAGES.PERMISSION_NOT_DELETED,
        data: null,
        error: PERMISSION_MESSAGES.PERMISSION_NOT_DELETED,
      };
      return res.status(200).json(responsePayload);
    }
  } catch (err) {
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: null,
      data: null,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    };
    return res.status(500).json(responsePayload);
  }
};

module.exports = {
    addPermission,
    getPermissionById,
    getAllPermissions,
    updatePermission,
    deletePermission
};
