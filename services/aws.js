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

    let upload = await s3.upload(uploadParams, function (err, data) {
        if (err) {
            throw new ErrorObject(err)
        }
    }).promise();


    return upload.Location
}