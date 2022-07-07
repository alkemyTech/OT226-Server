const express = require('express')
const { destroy } = require('../controllers/comments')
const { verifyUsers } = require('../middlewares/auth')

const router = express.Router()

router.delete('/:id', verifyUsers, destroy)

module.exports = router
