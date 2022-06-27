const multer = require('multer')
const path = require('path')
const { v4: uuid } = require('uuid')

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

module.exports = config
