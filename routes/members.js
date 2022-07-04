const router = require('express').Router()

const { get } = require('../controllers/members')
const { destroy } = require('../controllers/members')
const { verifyUsers } = require('../middlewares/auth')

router.get('/', get)
router.delete('/:id', verifyUsers, destroy)

module.exports = router
