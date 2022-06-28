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
