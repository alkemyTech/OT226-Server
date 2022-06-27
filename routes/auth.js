const router = require('express').Router()

const { post, login, getInformation } = require('../controllers/users')
const { schemaValidator } = require('../middlewares/validator')
const { user } = require('../schemas/user')
const { isAuthenticatedUser } = require('../middlewares/auth')

router.post('/register', schemaValidator(user), post)
router.post('/login', login)
router.get('/me', isAuthenticatedUser, getInformation)

module.exports = router
