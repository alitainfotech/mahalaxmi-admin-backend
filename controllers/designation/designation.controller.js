const {
  RESPONSE_PAYLOAD_STATUS_SUCCESS,
  RESPONSE_STATUS_CODE_OK,
  RESPONSE_PAYLOAD_STATUS_ERROR,
  RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
  RESPONSE_PAYLOAD_STATUS_WARNING,
} = require("../../constants/global.constants");

const {
  DESIGNATION_MESSAGES,
} = require("../../controller_messages/designation.messages");
const { getCurrentLoginUser } = require("../../helpers/fn");
const designationModel = require("../../models/designation.model");

// add new Designation
const addDesignation = async (req, res) => {
  try {
    const { name } = req.body;

    const existingDesignation = await designationModel.findOne({ name });

    if (existingDesignation) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_WARNING,
        message: DESIGNATION_MESSAGES.DESIGNATION_ALREADY_EXISTS,
        data: null,
        error: DESIGNATION_MESSAGES.DESIGNATION_ALREADY_EXISTS,
      };
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    }

    const addDesignation = await designationModel.create({
      name,
    });

    if (addDesignation) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: DESIGNATION_MESSAGES.DESIGNATION_ADD,
        data: addDesignation,
        error: null,
      };
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: DESIGNATION_MESSAGES.DESIGNATION_NOT_ADDED,
        data: null,
        error: DESIGNATION_MESSAGES.DESIGNATION_NOT_ADDED,
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

// Get Designation By Id
const getDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const getDesignation = await designationModel.findById({
      _id: id,
      is_deleted: false,
    });

    if (getDesignation && getDesignation !== null) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: DESIGNATION_MESSAGES.DESIGNATION_ID_FOUND,
        data: getDesignation,
        error: null,
      };
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: DESIGNATION_MESSAGES.DESIGNATION_ID_NOT_FOUND,
        data: null,
        error: DESIGNATION_MESSAGES.DESIGNATION_ID_NOT_FOUND,
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
};

// Update Designation
const updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateDesignation = await designationModel.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      { new: true }
    );
    if (updateDesignation) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: DESIGNATION_MESSAGES.DESIGNATION_UPDATED,
        data: updateDesignation,
        error: DESIGNATION_MESSAGES.DESIGNATION_UPDATED,
      };

      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: DESIGNATION_MESSAGES.DESIGNATION_NOT_UPDATED,
        data: null,
        error: DESIGNATION_MESSAGES.DESIGNATION_NOT_UPDATED,
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

// Delete Designation
const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getCurrentLoginUser(req);

    const deleteDesignation = await designationModel.findByIdAndUpdate(
      id,
      {
        $set: {
          is_deleted: true,
          deleted_by: user._id,
          deleted_at: new Date(),
        },
      },
      { new: true }
    );
    if (deleteDesignation) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: DESIGNATION_MESSAGES.DESIGNATION_DELETED,
        data: deleteDesignation,
        error: null,
      };

      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: DESIGNATION_MESSAGES.DESIGNATION_NOT_DELETED,
        data: null,
        error: DESIGNATION_MESSAGES.DESIGNATION_NOT_DELETED,
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

// Get all Designation
const getAllDesignation = async (req, res) => {
  try {
    let designationData = await designationModel.find({ is_deleted: false });

    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
      message: DESIGNATION_MESSAGES.DESIGNATION_ID_FOUND,
      data: designationData || [],
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

    return res
      .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
      .json(responsePayload);
  }
};

module.exports = {
  addDesignation,
  updateDesignation,
  getDesignation,
  deleteDesignation,
  getAllDesignation,
};
