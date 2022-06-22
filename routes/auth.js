const router = require('express').Router()
const { post } = require('../controllers/users')
const { schemaValidator } = require('../middlewares/validator')
const { user } = require('../schemas/user')

// /users
router.post('/register', schemaValidator(user), post)

module.exports = router
