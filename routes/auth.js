const router = require('express').Router()
const { post } = require('../controllers/users')

// /users
router.post('/register', post)

module.exports = router
