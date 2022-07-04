const router = require('express').Router()

const { destroy } = require('../controllers/members')
const { verifyUsers } = require('../middlewares/auth')

router.delete('/:id', verifyUsers, destroy)

module.exports = router
