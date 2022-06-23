const router = require('express').Router()
const { post, login } = require('../controllers/users')
const schemaValidator = require('../middlewares/validator')
const { user } = require('../schemas/user')

router.post('/register', schemaValidator(user), post)
router.post('/login', login)

module.exports = router
