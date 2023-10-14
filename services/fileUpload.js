const {
  S3Client,
  PutObjectCommand
} = require("@aws-sdk/client-s3");
const s3Config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  },
  region: process.env.AWS_S3_BUCKET_REGION,
};

const s3Client = new S3Client(s3Config);

module.exports = { s3Client }
