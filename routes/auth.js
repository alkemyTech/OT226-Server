const router = require('express').Router()
const { post, login } = require('../controllers/users')
const { schemaValidator } = require('../middlewares/validator')
const { user } = require('../schemas/user')
const { createJWT } = require('../middlewares/jwt')

router.post('/register', schemaValidator(user), post)
router.post('/login', createJWT, login)

module.exports = router
