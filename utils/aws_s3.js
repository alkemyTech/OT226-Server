const fs = require('fs')
const { s3 } = require('../config/aws')

const bucketName = process.env.AWS

exports.uploadImage = async (file) => {
  const fileStream = fs.createReadStream(file.path)
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }
  const upload = await s3.upload(uploadParams)
  return upload
}
