const router = require('express').Router()
<<<<<<< HEAD
const { post } = require('../controllers/users')

// /users
router.post('/register', post)
=======
const { post, login } = require('../controllers/users')
const schemaValidator = require('../middlewares/validator')
const { user } = require('../schemas/user')

router.post('/register', schemaValidator(user), post)
router.post('/login', login)
>>>>>>> 213c84dc73e9336683e68ab02fd4593650d4c1a1

module.exports = router
