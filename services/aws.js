const fs = require('fs')
const { v4: uuid } = require('uuid')
const aws = require('aws-sdk')
const multer = require('multer')
const path = require('path')

const { ErrorObject } = require('../helpers/error')
const { development, production } = require('../config/config')

const bucketName = process.env.AWS_BUCKET_NAME
aws.config.update({ region: process.env.AWS_BUCKET_REGION })

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (req, file, next) => {
    next(null, uuid() + path.extname(file.originalname))
  },
})

const localUpload = multer({
  storage,
  dest: path.join(__dirname, '../public/uploads'),
  limits: { fileSize: 20000000 },
}).single('image')

const s3 = new aws.S3({
  credentials: {
    accessKeyId: development.accessKeyId || production.accessKeyId,
    secretAccessKey: development.secretAccessKey || production.secretAccessKey,
  },
})

exports.uploadImage = async (file, deleteLocal = true) => {
  const fileStream = fs.createReadStream(file.path)
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }

  const upload = await s3
    .upload(uploadParams, (err) => {
      if (err) {
        throw new ErrorObject(err)
      }
    })
    .promise()
    .then(
      deleteLocal
        && fs.unlink(file.path, (err) => {
          if (err) throw ErrorObject(err)
        }),
    )

  return upload.Location
}

exports.s3 = s3
exports.localUpload = localUpload
