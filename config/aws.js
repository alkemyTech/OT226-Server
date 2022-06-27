const aws = require('aws-sdk')

aws.config.update({ region: process.env.AWS_BUCKET_REGION })

const s3 = new aws.S3({
  credentials: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
})

exports.s3 = s3
