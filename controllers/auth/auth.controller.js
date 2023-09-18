const bcrypt = require("bcrypt");
const { comparePasswordHash } = require("../../helpers/fn");

const {
  RESPONSE_PAYLOAD_STATUS_SUCCESS,
  RESPONSE_STATUS_CODE_OK,
  RESPONSE_PAYLOAD_STATUS_ERROR,
  RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
  AUTH_USER_DETAILS,
  RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
} = require("../../constants/global.constants");

const authService = require("../../services/auth.service");
const {
  addLogInToken,
} = require("../user/user.controller");
const userModel = require("../../models/user.model");
const { AUTH_MESSAGES } = require("../../controller_messages/auth.messages");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email: email,
    });

    if (user && (await comparePasswordHash(password, user.password))) {
      const userObj = user.toJSON();
      delete userObj.password;
      const tokenObj = {
        _id: userObj._id,
        email: userObj.email,
        name: userObj.name,
      };
      const token = authService.generateToken(tokenObj);
      await addLogInToken(token, user._id);
      // await userModel.findOneAndUpdate(
      //   {
      //     email: email,
      //   },
      //   { last_login: new Date() }
      // );
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: AUTH_MESSAGES.LOGIN_SUCCESSFUL,
        data: { token: token, userObj },
        error: null,
      };
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: AUTH_MESSAGES.INVALID_CREDENTIALS,
        data: null,
        error: AUTH_MESSAGES.INVALID_CREDENTIALS,
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

// logout functionality
const logout = async (req, res) => {
  try {
    const { _id } = req[AUTH_USER_DETAILS];
    const loggedOut = await userModel.findByIdAndUpdate({ _id }, { token: null });

    if (loggedOut) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: AUTH_MESSAGES.LOGOUT_SUCCESSFUL,
        data: null,
        error: null,
      };

      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: null,
        data: null,
        message: AUTH_MESSAGES.LOGOUT_FAILED,
      };
      

      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    }
  } catch (err) {
    console.log(err)
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

// // RESET PASSWORD
// const resetPassword = async (req, res) => {
//   try {
//     const { reset_password_token, new_password } = req.body;

//     const user = await User.findOneAndUpdate(
//       {
//         reset_password_token: reset_password_token,
//       },
//       {
//         password: await bcrypt.hashSync(new_password, 12),
//         reset_password_token: null,
//       }
//     );

//     if (user) {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//         message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESSFULL,
//         data: null,
//         error: null,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     } else {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_ERROR,
//         message: AUTH_MESSAGES.TOKEN_INVALID,
//         data: null,
//         error: AUTH_MESSAGES.TOKEN_INVALID,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     }
//   } catch (err) {
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

// const changePassword = async (req, res) => {
//   try {
//     const { _id } = req[AUTH_USER_DETAILS];
//     const { old_password, new_password } = req.body;

//     const user = await User.findOne({ _id: _id });
//     if (user) {
//       const passwordHash = user.password;
//       const isValidPassword = await comparePasswordHash(
//         old_password,
//         passwordHash
//       );

//       if (isValidPassword) {
//         const encryptedPassword = await bcrypt.hashSync(new_password, 12);
//         const changePassword = await User.findByIdAndUpdate(
//           { _id },
//           { password: encryptedPassword }
//         );

//         if (changePassword) {
//           const responsePayload = {
//             status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//             message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESSFULL,
//             data: null,
//             error: null,
//           };

//           return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//         } else {
//           const responsePayload = {
//             status: RESPONSE_PAYLOAD_STATUS_ERROR,
//             message: AUTH_MESSAGES.PASSWORD_RESET_UN_SUCCESSFULL,
//             data: null,
//             error: AUTH_MESSAGES.PASSWORD_RESET_UN_SUCCESSFULL,
//           };

//           return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//         }
//       } else {
//         const responsePayload = {
//           status: RESPONSE_PAYLOAD_STATUS_ERROR,
//           message: AUTH_MESSAGES.CURRENT_PASSWORD_INVALID,
//           data: null,
//           error: AUTH_MESSAGES.CURRENT_PASSWORD_INVALID,
//         };

//         return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//       }
//     } else {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_ERROR,
//         message: USER_MESSAGES.USERS_NOT_FOUND,
//         data: null,
//         error: AUTH_MESSAGES.INVALID_CREDENTIALS,
//       };

//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     }
//   } catch (err) {
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

// // Forgot password
// const forgotPassword = async (req, res) => {
//   try {
//     let { email } = req.body;
//     const userObj = await User.findOne({
//       email: email,
//     });

//     if (userObj) {
//       const user = userObj.toJSON();
//       const token = authService.generateTokenForgotPassword(email, user.id);
//       await addResetPasswordToken(token, email);

//       var responsePayload = {
//         status: 1,
//         message: "Check your mail box for a link shared to change password.",
//         data: token,
//         error: null,
//       };

//       return res.status(200).json(responsePayload);
//     } else {
//       const responsePayload = {
//         status: 0,
//         message: null,
//         data: null,
//         error: "User not found!",
//       };

//       return res.status(200).json(responsePayload);
//     }
//   } catch (err) {
//     const responsePayload = {
//       status: 0,
//       message: null,
//       data: null,
//       error: "Internal server error!",
//     };

//     return res.status(500).json(responsePayload);
//   }
// };

// // sending the reset password token
// const checkResetPasswordToken = async (req, res) => {
//   try {
//     const { token } = req.body;
//     const checked = await User.findOne({
//       reset_password_token: token,
//       reset_password_expiry_time: { $gte: new Date() },
//     });
//     if (checked) {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
//         message: AUTH_MESSAGES.URL_CORRECT,
//         data: null,
//         error: null,
//       };
//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     } else {
//       const responsePayload = {
//         status: RESPONSE_PAYLOAD_STATUS_ERROR,
//         message: null,
//         data: null,
//         error: AUTH_MESSAGES.LINK_INCORRECT,
//       };
//       return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
//     }
//   } catch (err) {
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

module.exports = {
  login,
  logout,
  // resetPassword,
  // changePassword,
  // forgotPassword,
  // checkResetPasswordToken,
};
