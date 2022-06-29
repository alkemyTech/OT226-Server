const fs = require('fs')
const { s3 } = require('../config/aws')
const { ErrorObject } = require('../helpers/error')

const bucketName = process.env.AWS_BUCKET_NAME

exports.uploadImage = async (file) => {
  const fileStream = fs.createReadStream(file.path)
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }

  let upload = await s3
    .upload(uploadParams, function (err, data) {
      if (err) {
        throw new ErrorObject(err)
      }
    })
    .promise()

  return upload.Location
}
const aws = require('aws-sdk')
const multer = require('multer')
const path = require('path')
const { v4: uuid } = require('uuid')
const { development, production } = require('../config/config')

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (req, file, next) => {
    next(null, uuid() + path.extname(file.originalname))
  },
})

const config = multer({
  storage,
  dest: path.join(__dirname, '../public/uploads'),
  limits: { fileSize: 20000000 },
}).single('image')

aws.config.update({ region: process.env.AWS_BUCKET_REGION })

const s3 = new aws.S3({
  credentials: {
    accessKeyId: development.accessKeyId || production.accessKeyId,
    secretAccessKey: development.secretAccessKey || production.secretAccessKey,
  },
})

exports.s3 = s3
exports.config = config
