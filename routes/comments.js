const router = require('express').Router()

const { put } = require('../controllers/comments')
const { verifyUsers } = require('../middlewares/auth')
const { ownerComments } = require('../middlewares/ownerComments')

// /comments
router.put('/:id', verifyUsers, ownerComments, put)

module.exports = router
