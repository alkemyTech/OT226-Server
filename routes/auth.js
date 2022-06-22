const router = require('express').Router()
const { login } = require('../controllers/users')

// /auth
router.post('/login', login)

module.exports = router
