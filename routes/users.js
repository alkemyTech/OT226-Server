const router = require('express').Router()
const { get } = require('../controllers/users')

// /users
router.get('/', get)

module.exports = router
