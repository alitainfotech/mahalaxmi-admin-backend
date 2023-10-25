const bcrypt = require("bcrypt");
require("dotenv").config()

const {
  RESPONSE_PAYLOAD_STATUS_SUCCESS,
  RESPONSE_STATUS_CODE_OK,
  RESPONSE_PAYLOAD_STATUS_ERROR,
  RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
  RESPONSE_PAYLOAD_STATUS_WARNING,
} = require("../../constants/global.constants");
const userModel = require("../../models/user.model");
const { USERS_MESSAGES } = require("../../controller_messages/users.messages");
const branchModel = require("../../models/branch.model");
const { getCurrentLoginUser } = require("../../helpers/fn");
const { default: mongoose } = require("mongoose");
const { HeadObjectCommand, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../../services/fileUpload");

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

// Add Users
const addUsers = async (req, res) => {
  try {
    const {
      role, branch, designation,
      first_name, middle_name, last_name,
      email, password, phone_number, address,
      city, state, gender, dob, joining_date,
      salary, account_number, ifsc_code,
      holder_name } = req.body


    const existUser = await userModel.findOne({ email: email });

    if (existUser) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_WARNING,
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

    const file = req.files.profile_photo;
    const originalFileName = file.name;
    const fileExtension = originalFileName.split('.').pop();
    const profile_photo = `employee/profile_photo/${first_name}_${Date.now()}.${fileExtension}`;

    const bucketParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: profile_photo,
      Body: file.data,
    };

    try {
      // const headObjectParams = {
      //   Bucket: bucketParams.Bucket,
      //   Key: bucketParams.Key
      // };

      // const headObjectData = await s3Client.send(new HeadObjectCommand(headObjectParams));

      // if (headObjectData) {
      //   const responsePayload = {
      //     status: RESPONSE_PAYLOAD_STATUS_ERROR,
      //     message: 'Profile photo with the same name already exists.',
      //     data: null,
      //     error: 'Profile photo with the same name already exists.',
      //   };
      //   return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
      // } else {
      const data = await s3Client.send(new PutObjectCommand(bucketParams));
      // }
    } catch (err) {
      console.log('Error occurred while uploading image to S3', err);
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
    if (req.files) {
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
    console.log(error);
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: null,
      data: null,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
    }
    return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload)

  }
}

// Get Users By Id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const userObj = await userModel.aggregate([
      {
        $match: { _id: id, is_deleted: false }
      },
      {
        $project: {
          password: 0,
          token: 0,
          reset_password_token: 0,
        }
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          as: 'roles'
        }
      }
    ]);

    if (userObj.length > 0) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: USERS_MESSAGES.USERS_ID_FOUND,
        data: {
          user: userObj[0]
        },
        error: null
      };
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: USERS_MESSAGES.USERS_ID_NOT_FOUND,
        data: null,
        error: null
      };
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    }
  } catch (error) {
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
      data: null,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR
    };
    return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);
  }
};

// Update Users
const updateUser = async (req, res) => {
  try {
    let { id } = req.params
    const {
      role, branch, designation,
      first_name, middle_name, last_name,
      phone_number, address,
      city, state, gender, dob, joining_date,
      salary, account_number, ifsc_code,
      holder_name } = req.body

    const existingUser = await userModel.findById(id);
    if (existingUser) {
      const existingProfilePhoto = existingUser.profile_photo;

      if (existingProfilePhoto) {
        const deleteParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: existingProfilePhoto,
        };
        try {
          await s3Client.send(new DeleteObjectCommand(deleteParams));
        } catch (error) {
          console.log('Error occurred while deleting the old image from S3', error);
        }
      }
    }

    const file = req.files.profile_photo;
    const originalFileName = file.name;
    const fileExtension = originalFileName.split('.').pop();
    const profile_photo = `employee/profile_photo/${first_name}_${Date.now()}.${fileExtension}`;

    const bucketParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: profile_photo,
      Body: file.data,
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(bucketParams));
    } catch (error) {
      console.log('Error occurred while uploading the image to S3', error);
    }

    const updateUser = {
      profile_photo,
      role,
      branch,
      designation,
      first_name,
      middle_name,
      last_name,
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
    }

    if (req.files) {
      const updateUserData = await userModel.findByIdAndUpdate(id, updateUser, { new: true })
      if (updateUserData) {
        const userObj = updateUserData.toJSON();

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

// Delete Users
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
        data: null,
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

// Get All Users
const getAllUsers = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const skip = (page - 1) * perPage;

    const usersData = await userModel.aggregate([
      {
        $match: { is_deleted: false }
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          as: "rolesInfo"
        }
      },
      {
        $lookup: {
          from: 'branches',
          localField: 'branch',
          foreignField: '_id',
          as: 'branchInfo'
        }
      },
      {
        $lookup: {
          from: 'designations',
          localField: 'designation',
          foreignField: '_id',
          as: 'designationInfo'
        }
      },
      {
        $project: {
          _id: 1,
          code: 1,
          first_name: 1,
          middle_name: 1,
          last_name: 1,
          phone_number: 1,
          address: 1,
          city: 1,
          state: 1,
          gender: 1,
          dob: 1,
          joining_date: 1,
          salary: 1,
          account_number: 1,
          ifsc_code: 1,
          holder_name: 1,
          'rolesInfo.name': 1,
          'branchInfo.name': 1,
          'designationInfo.name': 1
        }
      },
      {
        $skip: skip,
      },
      {
        $limit: perPage,
      }
    ]);

    if (usersData) {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: USERS_MESSAGES.USERS_ID_FOUND,
        data: usersData || [],
        error: null,
      };

      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: USERS_MESSAGES.USERS_ID_NOT_FOUND,
        data: null,
        error: null,
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
};

// Change Password By Admin
const changePasswordByAdmin = async (req, res) => {
  try {

    const { id } = req.params;
    const { password } = req.body;

    const encryptedPassword = await bcrypt.hashSync(password, 12);
    const changePassword = await userModel.findByIdAndUpdate(
      id,
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
  changePasswordByAdmin,
  getAllUsers
};

