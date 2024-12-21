const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// AWS S3 초기화
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

/**
 * 파일을 S3에 업로드
 * @param {Object} file - 업로드된 파일 (Multer 제공)
 * @returns {Promise<string>} - 업로드된 파일의 URL
 */
const uploadToS3 = async (file) => {
  try {
    const fileKey = `${uuidv4()}-${file.originalname}`; // 고유 파일명 생성

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location; // 업로드된 파일의 URL 반환
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error('Failed to upload file to S3');
  }
};

module.exports = {
  uploadToS3,
};
