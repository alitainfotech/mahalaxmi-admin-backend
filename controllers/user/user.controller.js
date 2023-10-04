const bcrypt = require("bcrypt");

const {
  RESPONSE_PAYLOAD_STATUS_SUCCESS,
  RESPONSE_STATUS_CODE_OK,
  RESPONSE_PAYLOAD_STATUS_ERROR,
  RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
  AUTH_USER_DETAILS,
  RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_CODE_VALIDATION_ERROR,
} = require("../../constants/global.constants");
const userModel = require("../../models/user.model");
const { USERS_MESSAGES } = require("../../controller_messages/users.messages");
const branchModel = require("../../models/branch.model");
const { getCurrentLoginUser } = require("../../helpers/fn");

// const {
//   forgotPasswordMailer,
// } = require("../../services/mailer/forgotPasswordMailTemplate");

const addLogInToken = async (token, id) => {
  try {
    await userModel.findOneAndUpdate({ _id: id }, { $set: { token: token } });
  } catch (error) {
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

// const addResetPasswordToken = async (token, email) => {
//   try {
//     const dt = new Date();
//     dt.setHours(dt.getHours() + 2);
//     await forgotPasswordMailer(token, email);

//     return User.findOneAndUpdate(
//       { email: email },
//       {
//         reset_password_token: token,
//         reset_password_expiry_time: dt,
//       }
//     );
//   } catch (error) {
//     const responsePayload = {
//       status: RESPONSE_PAYLOAD_STATUS_ERROR,
//       message: null,
//       data: null,
//       error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//     };

//     return res
//       .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//       .json(responsePayload);
//   }
// };

// const getUser = async (req, res) => {
//   try {
//     const { _id } = req[AUTH_USER_DETAILS];
//     const user = await User.findOne({ _id });

//     if (user) {
//       let userObj = user.toJSON();
//       delete userObj.password;
//       delete userObj.token;
//       delete userObj.reset_password_token;
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//         message: USER_MESSAGES.USERS_FOUND,
//         data: userObj,
//         error: null,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     } else {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_ERROR,
//         message: USER_MESSAGES.USERS_NOT_FOUND,
//         data: null,
//         error: null,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     }
//   } catch (error) {
//     const responsePayload = {
//       status: RESPONSE_PAYLOAD_STATUS_ERROR,
//       message: null,
//       data: null,
//       error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//     };

//     return res
//       .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//       .json(responsePayload);
//   }
// };

// const getUserAll = async (req, res) => {
//   try {
//     const users = await User.find({});

//     if (users) {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//         message: USER_MESSAGES.USERS_FOUND,
//         data: users,
//         error: null,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     } else {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_ERROR,
//         message: USER_MESSAGES.USERS_NOT_FOUND,
//         data: null,
//         error: null,
//       };

//       return res.status(RESPONSE_PAYLOAD_STATUS_ERROR).json(responsePayload);
//     }
//   } catch (error) {
//     const responsePayload = {
//       status: RESPONSE_PAYLOAD_STATUS_ERROR,
//       message: null,
//       data: null,
//       error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//     };

//     return res
//       .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//       .json(responsePayload);
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const { _id } = req[AUTH_USER_DETAILS];
//     const {
//       first_name,
//       last_name,
//       phone_number,
//       address,
//       city,
//       state,
//       pincode,
//       country,
//     } = req.body;
//     const updateUser = await User.findByIdAndUpdate(
//       { _id },
//       {
//         first_name: first_name,
//         last_name: last_name,
//         phone_number: phone_number,
//         address: address,
//         city: city,
//         state: state,
//         pincode: pincode,
//         country: country,
//       },
//       { new: TRUE }
//     );

//     if (updateUser) {
//       const userObj = updateUser.toJSON();
//       delete userObj.password;
//       delete userObj.token;
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//         message: USER_MESSAGES.USERS_UPDATED,
//         data: userObj,
//         error: null,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     } else {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_ERROR,
//         message: USER_MESSAGES.USERS_NOT_UPDATED,
//         data: null,
//         error: null,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     }
//   } catch (error) {
//     const responsePayload = {
//       status: RESPONSE_PAYLOAD_STATUS_ERROR,
//       message: null,
//       data: null,
//       error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//     };

//     return res
//       .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//       .json(responsePayload);
//   }
// };

// const addUsers = async (req, res) => {
//   try {
//     const {
//       first_name,
//       last_name,
//       email,
//       phone_number,
//       address,
//       city,
//       state,
//       pincode,
//       password,
//       country,
//     } = req.body;

//     let existUser = await User.find({ email: email });

//     if (existUser.length === 1) {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_ERROR,
//         message: USER_MESSAGES.EMAIL_EXISTS,
//         data: null,
//         error: USER_MESSAGES.EMAIL_EXISTS,
//       };

//       return res
//         .status(RESPONSE_STATUS_CODE_VALIDATION_ERROR)
//         .json(responsePayload);
//     } else {
//       let new_password = bcrypt.hashSync(password, 12);
//       const user = User.create({
//         first_name: first_name,
//         last_name: last_name,
//         email: email,
//         phone_number: phone_number,
//         address: address,
//         city: city,
//         state: state,
//         pincode: pincode,
//         country: country,
//         password: new_password,
//       });

//       if (user) {
//         const responsePayload = {
//           status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//           message: USER_MESSAGES.USERS_ADDED,
//           data: user,
//           error: null,
//         };

//         return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//       } else {
//         const responsePayload = {
//           status: RESPONSE_PAYLOAD_STATUS_ERROR,
//           message: USER_MESSAGES.USERS_NOT_ADDED,
//           data: null,
//           error: USER_MESSAGES.USERS_NOT_ADDED,
//         };

//         return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//       }
//     }
//   } catch (error) {
//     const responsePayload = {
//       status: RESPONSE_PAYLOAD_STATUS_ERROR,
//       message: null,
//       data: null,
//       error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
//     };

//     return res
//       .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
//       .json(responsePayload);
//   }
// };


const addUsers = async (req, res) => {
  try {
    const {
      role, branch, designation,
      first_name, middle_name, last_name,
      email, password, phone_number, address,
      city, state, gender, dob, joining_date,
      salary, account_number, ifsc_code,
      holder_name, profile_photo } = req.body


    const existUser = await userModel.findOne({ email: email });

    if (existUser) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: USERS_MESSAGES.USERS_ALREADY_EXISTS,
        data: null,
        error: USERS_MESSAGES.USERS_ALREADY_EXISTS
      }
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
    }

    let encryptedPassword = await bcrypt.hashSync(password, 12);
    const branchCodeFind = await branchModel.findById({ _id: branch }).then((branch) => branch.code)

    const branchCodeIncrement = await userModel.find({ branch: branch })
      .sort({ code: -1 })
      .limit(1);

    let userCode;
    if (branchCodeIncrement.length > 0) {
      userCode = parseInt(branchCodeIncrement[0]?.code.split("-")[1]) + 1;
    } else {
      userCode = 1;
    }

    const addUserData = {
      code: `MH${branchCodeFind}-` + (parseInt(userCode - 1) + 1).toString().padStart(3, '0'),
      role,
      branch,
      designation,
      first_name,
      middle_name,
      last_name,
      email,
      password: encryptedPassword,
      phone_number,
      address,
      city,
      state,
      gender,
      dob,
      joining_date,
      salary,
      account_number,
      ifsc_code,
      holder_name,
      profile_photo
    }
    if (req.file) {
      const addUser = await userModel.create(addUserData)

      if (addUser) {
        const responsePayload = {
          status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
          message: USERS_MESSAGES.USERS_ADD,
          data: addUser,
          error: null
        }
        return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
      } else {
        const responsePayload = {
          status: RESPONSE_PAYLOAD_STATUS_ERROR,
          message: USERS_MESSAGES.USERS_NOT_ADDED,
          data: null,
          error: null
        }
        return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
      }
    }

  } catch (error) {
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: null,
      data: null,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
    }
    return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)

  }
}

const getUserById = async (req, res) => {
  try {
    let userData = req[AUTH_USER_DETAILS];
    let user = userData._id;

    let userDetails = await userModel.findOne({ _id: user },
      {
        password: 0,
        token: 0,
        reset_password_token: 0,
      });

    const userObj = userDetails.toJSON();

    if (userObj) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: USERS_MESSAGES.USERS_ID_FOUND,
        data: userObj,
        error: null
      }
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: USERS_MESSAGES.USERS_ID_NOT_FOUND,
        data: null,
        error: null
      }
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
    }
  } catch (error) {
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
      data: null,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
    }
    return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)

  }
}

const updateUser = async (req, res) => {
  try {
    let { id } = req.params
    const {
      code, role, branch, designation,
      first_name, middle_name, last_name,
      email, phone_number, address,
      city, state, gender, dob, joining_date,
      salary, account_number, ifsc_code,
      holder_name } = req.body

    const updateUser = await userModel.findByIdAndUpdate(
      id,
      {
        role,
        branch,
        designation,
        first_name,
        middle_name,
        last_name,
        email,
        phone_number,
        address,
        city,
        state,
        gender,
        dob,
        joining_date,
        salary,
        account_number,
        ifsc_code,
        holder_name,
        updatedAt: Date.now()
      },
      { new: true }
    )
    if (updateUser) {
      const userObj = updateUser.toJSON();

      delete userObj.password;
      delete userObj.token;
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: USERS_MESSAGES.USERS_UPDATED,
        data: userObj,
        error: null
      }
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: USERS_MESSAGES.USERS_NOT_UPDATED,
        data: null,
        error: USERS_MESSAGES.USERS_NOT_UPDATED
      }
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
    }
  } catch (error) {
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
      data: null,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
    }
    return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)
  }
}

const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getCurrentLoginUser(req);

    const deleteUser = await userModel.findByIdAndUpdate(id,
      {
        is_deleted: true,
        deleted_by: user._id,
        deleted_at: new Date()
      },
      { new: true }
    )
    if (deleteUser) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: USERS_MESSAGES.USERS_DELETED,
        data: deleteUser,
        error: null,
      };

      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: USERS_MESSAGES.USERS_NOT_DELETED,
        data: null,
        error: USERS_MESSAGES.USERS_NOT_DELETED,
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

const changePasswordByAdmin = async (req, res) => {
  try {

    const { _id } = req[AUTH_USER_DETAILS];
    const { password } = req.body;


    const encryptedPassword = await bcrypt.hashSync(password, 12);
    const changePassword = await userModel.findByIdAndUpdate(
      { _id },
      { password: encryptedPassword },
      { new: true }
    );

    if (changePassword) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: USERS_MESSAGES.USERS_PASSWORD_CHANGE,
        data: changePassword,
        error: null
      };
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: USERS_MESSAGES.USERS_PASSWORD_NOT_CHANGE,
        data: null,
        error: null
      };
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    }
  } catch (error) {
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
  addLogInToken,
  addUsers,
  getUserById,
  updateUser,
  deleteUsers,
  changePasswordByAdmin
  // addResetPasswordToken,
  // getUser,
  // getUserAll,
  // updateUser,
  // addUsers,
};

