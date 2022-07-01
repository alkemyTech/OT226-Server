const fs = require('fs')

exports.enCode64 = (file) => {
  const img = fs.readFileSync(file.path)
  const encodeImage = img.toString('base64')

  return {
    contentType: file.mimetype,
    image: Buffer.from(encodeImage, 'base64'),
    filename: file.filename,
    path: file.path,
  }
}
