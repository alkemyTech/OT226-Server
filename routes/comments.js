const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { post } = require('../controllers/comments')
const { verifyUsers } = require('../middlewares/auth')
const { comment } = require('../schemas/comment')

const router = express.Router()

router.post('/', verifyUsers, schemaValidator(comment), post)

module.exports = router
