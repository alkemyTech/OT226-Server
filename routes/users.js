const router = require('express').Router()
const { get } = require('../controllers/users')

// /users
router.get('/', get) // obtain the list of users

module.exports = router
