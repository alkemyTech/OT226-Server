const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { post, destroy } = require('../controllers/comments')
const { verifyUsers } = require('../middlewares/auth')
const { comment } = require('../schemas/comment')

const router = express.Router()

router.post('/', verifyUsers, schemaValidator(comment), post)
router.delete('/:id', verifyUsers, destroy)

module.exports = router
