require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const AWS = require("aws-sdk");
const {
    RESPONSE_PAYLOAD_STATUS_SUCCESS,
    RESPONSE_STATUS_CODE_OK,
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR
} = require("../../constants/global.constants");
const { BANKTRANSFER_MESSAGES } = require("../../controller_messages/bankTransfer.messages");
const bankTransferModel = require("../../models/bankTransfer.model");
const branchModel = require("../../models/branch.model");
const customerModel = require("../../models/customer.model");
const { s3Client } = require("../../services/fileUpload");
const { getCurrentLoginUser, generateRandomNumber } = require("../../helpers/fn");
const { STATUS } = require("../../constants/enum.constants");
const otpManageModel = require('../../models/otp.manage.model');
require("dotenv").config()

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_SNS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SNS_ACCESS_SECRET,
    },
    region: process.env.AWS_S3_BUCKET_REGION,
});

// Add Bank Transfer
const addBankTransfer = async (req, res) => {
    try {
        const { customer, branch, bank, payment_mode,
            amount, status, reject_reason } = req.body

        const branchCodeFind = await branchModel.findById({ _id: branch }).then((branch) => branch.code)
        const customerCodeFind = await customerModel.findById({ _id: customer }).then((customer) => customer.code)
        const customerNameFind = await customerModel.findById({ _id: customer }).then((customer) => customer.first_name)

        const filesToUpload = [
            'live_photo',
            'aadhaar_card_front',
            'aadhaar_card_back',
            'pan_card',
            'reciept_of_customer',
            'promissory_note',
            'signed_check'
        ];

        const uploadedFiles = {};

        for (const fieldName of filesToUpload) {
            const file = req.files[fieldName];
            if (file) {
                const originalFileName = file.name;
                const fileExtension = originalFileName.split('.').pop();
                const key = `bankTransfer/${fieldName}/${customerNameFind}_${Date.now()}.${fileExtension}`;

                const bucketParams = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: key,
                    Body: file.data,
                };

                try {
                    const data = await s3Client.send(new PutObjectCommand(bucketParams));
                    uploadedFiles[fieldName] = key;
                } catch (error) {
                    console.log('Error occurred while uploading image to S3', error);
                }
            }
        }

        const addBankTransferData = {
            code: branchCodeFind + customerCodeFind,
            customer,
            branch,
            bank,
            payment_mode,
            amount,
            status,
            reject_reason,
            ...uploadedFiles
        }

        if (req.files) {
            const addBankTransfer = await bankTransferModel.create(addBankTransferData)

            if (addBankTransfer) {
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                    message: BANKTRANSFER_MESSAGES.BANKTRANSFER_ADD,
                    data: addBankTransfer,
                    error: null
                }
                return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
            } else {
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_ERROR,
                    message: BANKTRANSFER_MESSAGES.BANKTRANSFER_NOT_ADDED,
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

// Update Bank Transfer
const updateBankTransfer = async (req, res) => {
    try {
        let { id } = req.params
        const { customer, branch, bank, payment_mode,
            amount, status, reject_reason } = req.body

        const customerNameFind = await customerModel.findById({ _id: customer }).then((customer) => customer.first_name)

        const existingUser = await bankTransferModel.findById(id);
        if (existingUser) {
            const existingLivePhoto = existingUser.live_photo;
            const existingAadharCardFront = existingUser.aadhaar_card_front;
            const existingAadharCardBack = existingUser.aadhaar_card_back;
            const existingPancard = existingUser.pan_card;
            const existingRecieptOfCustomer = existingUser.reciept_of_customer;
            const existingPromissoryNote = existingUser.promissory_note;
            const existingSignedCheck = existingUser.signed_check;

            const allFieldsPresent = existingLivePhoto && existingAadharCardFront && existingAadharCardBack && existingPancard && existingRecieptOfCustomer && existingPromissoryNote && existingSignedCheck;

            if (allFieldsPresent) {
                const deleteParams = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: allFieldsPresent,
                };
                try {
                    await s3Client.send(new DeleteObjectCommand(deleteParams));
                } catch (error) {
                    console.log('Error occurred while deleting the old image from S3', error);
                }
            }
        }

        const filesToUpload = [
            'live_photo',
            'aadhaar_card_front',
            'aadhaar_card_back',
            'pan_card',
            'reciept_of_customer',
            'promissory_note',
            'signed_check'
        ];

        const uploadedFiles = {};

        for (const fieldName of filesToUpload) {
            const file = req.files[fieldName];
            if (file) {
                const originalFileName = file.name;
                const fileExtension = originalFileName.split('.').pop();
                const key = `bankTransfer/${fieldName}/${customerNameFind}_${Date.now()}.${fileExtension}`;

                const bucketParams = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: key,
                    Body: file.data,
                };

                try {
                    const data = await s3Client.send(new PutObjectCommand(bucketParams));
                    uploadedFiles[fieldName] = key;
                } catch (error) {
                    console.log('Error occurred while uploading image to S3', error);
                }
            }
        }

        const updateBankTransferData = {
            customer,
            branch,
            bank,
            payment_mode,
            amount,
            status,
            reject_reason,
            ...uploadedFiles,
            updatedAt: Date.now()
        }

        if (req.files) {
            const updateBankTransfer = await bankTransferModel.findByIdAndUpdate(id, updateBankTransferData, { new: true })

            if (updateBankTransfer) {
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                    message: BANKTRANSFER_MESSAGES.BANKTRANSFER_UPDATED,
                    data: updateBankTransfer,
                    error: null
                }
                return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
            } else {
                const responsePayload = {
                    status: RESPONSE_PAYLOAD_STATUS_ERROR,
                    message: BANKTRANSFER_MESSAGES.BANKTRANSFER_NOT_UPDATED,
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

// Delete Bank Transfer
const deleteBankTransfer = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getCurrentLoginUser(req);

        const deleteUser = await bankTransferModel.findByIdAndUpdate(id,
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
                message: BANKTRANSFER_MESSAGES.BANKTRANSFER_DELETED,
                data: null,
                error: null,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BANKTRANSFER_MESSAGES.BANKTRANSFER_NOT_DELETED,
                data: null,
                error: BANKTRANSFER_MESSAGES.BANKTRANSFER_NOT_DELETED,
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

// Get Bank Transfer By Id
const getBankTransferById = async (req, res) => {
    try {
        const { id } = req.params

        const getBankTransfer = await bankTransferModel.findById(id)

        if (getBankTransfer) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BANKTRANSFER_MESSAGES.BANKTRANSFER_ID_FOUND,
                data: getBankTransfer,
                error: null
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BANKTRANSFER_MESSAGES.BANKTRANSFER_ID_NOT_FOUND,
                data: null,
                error: BANKTRANSFER_MESSAGES.BANKTRANSFER_ID_NOT_FOUND
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        }
    } catch (error) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
}

// Get All Bank Transfer
const getAllBankTransfer = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const skip = (page - 1) * perPage;

        const bankTransferData = await bankTransferModel.aggregate([
            {
                $match: { is_deleted: false }
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customer',
                    foreignField: '_id',
                    as: 'customerInfo'
                }
            },
            {
                $lookup: {
                    from: 'banks',
                    localField: 'bank',
                    foreignField: '_id',
                    as: 'bankInfo'
                }
            },
            {
                $project: {
                    code: 1,
                    customer: 1,
                    branch: 1,
                    bank: 1,
                    payment_mode: 1,
                    amount: 1,
                    live_photo: 1,
                    aadhaar_card_front: 1,
                    aadhaar_card_back: 1,
                    pan_card: 1,
                    reciept_of_customer: 1,
                    promissory_note: 1,
                    signed_check: 1,
                    status: 1,
                    reject_reason: 1,
                    is_deleted: 1,
                    deleted_by: 1,
                    created_by: 1,
                    updated_by: 1,
                    approved_by: 1,
                    reject_by: 1,
                    deleted_at: 1,
                    approved_at: 1,
                    reject_at: 1,
                    updatedAt: 1,
                    'customerInfo.first_name': 1,
                    'customerInfo.middle_name': 1,
                    'customerInfo.last_name': 1,
                    'bankInfo.name': 1
                }
            },
            {
                $skip: skip,
            },
            {
                $limit: perPage,
            }
        ]);

        if (bankTransferData) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BANKTRANSFER_MESSAGES.BANKTRANSFER_ID_FOUND,
                data: bankTransferData || [],
                error: null,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BANKTRANSFER_MESSAGES.BANKTRANSFER_ID_NOT_FOUND,
                data: null,
                error: null,
            };

            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
    } catch (error) {
        console.log(error);
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
}

// Status Update when Status Approved
const statusUpdateForApprove = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await getCurrentLoginUser(req);

        const statusUpdateData = await bankTransferModel.findByIdAndUpdate(id,
            {
                status: STATUS.STATUS_APPROVED,
                approved_by: user._id,
                approved_at: Date.now()

            });

        if (statusUpdateData) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BANKTRANSFER_MESSAGES.BANKTRANSFER_STATUS_UPDATED,
                data: null,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BANKTRANSFER_MESSAGES.BANKTRANSFER_STATUS_NOT_UPDATED,
                data: null,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)

        }
    } catch (error) {
        console.log(error);
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload); s
    }
}

// Status Update when Status Rejected
const statusUpdateForReject = async (req, res) => {
    try {

        const { id } = req.params;
        const { reject_reason } = req.body;

        const user = await getCurrentLoginUser(req);

        const statusUpdateData = await bankTransferModel.findByIdAndUpdate(id,
            {
                reject_reason: reject_reason,
                status: STATUS.STATUS_REJECTED,
                reject_by: user._id,
                reject_at: Date.now()

            });

        if (statusUpdateData) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BANKTRANSFER_MESSAGES.BANKTRANSFER_STATUS_UPDATED,
                data: null,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BANKTRANSFER_MESSAGES.BANKTRANSFER_STATUS_NOT_UPDATED,
                data: null,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)

        }
    } catch (error) {
        console.log(error);
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
}

//function to send OTP using AWS-SNS
const otpHandler = async (req, res) => {
    const { phone_number } = req.body
    // const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
    const OTP = generateRandomNumber(100000, 999999);
    console.log(OTP);

    // const addInOtpManage = await otpManageModel.create({
    //     phone_number: phone_number,
    //     otp: OTP,
    //     expired_at: expirationTime
    // })

    const params = {
        Message: `Welcome! Your mobile verification code is: ${OTP}. Mobile Number is: ${phone_number}`,
        PhoneNumber: phone_number,
    };

    const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

    sns.publish(params).promise()
        .then(data => {
            return res.json({ message: BANKTRANSFER_MESSAGES.OTP_SENT_SUCCESS, messageId: data.MessageId });
        })
        .catch(err => {
            return res.status(500).json({ error: BANKTRANSFER_MESSAGES.OTP_SENT_FAILED });
        });
};

const otpVerification = async (req, res) => {
    try {
        const { phone_number, otp } = req.body

        const otpVerification = await otpManageModel.findOne({ phone_number, otp })

        if (otpVerification) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: BANKTRANSFER_MESSAGES.OTP_VERIFICATION_SUCCESS,
                data: null,
                error: null
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        } else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: BANKTRANSFER_MESSAGES.OTP_VERIFICATION_FAILED,
                data: null,
                error: null
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload)
        }
    } catch (error) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res
            .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
            .json(responsePayload);
    }
}


module.exports = {
    addBankTransfer,
    updateBankTransfer,
    deleteBankTransfer,
    getAllBankTransfer,
    getBankTransferById,
    statusUpdateForApprove,
    statusUpdateForReject,
    otpHandler,
    otpVerification
};

