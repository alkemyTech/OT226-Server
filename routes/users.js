const router = require('express').Router()

const schemaValidator = require('../middlewares/validator')
const { user } = require('../schemas/user')

const { get, put } = require('../controllers/users')

// /users
router.get('/', get)
router.put('/:id', schemaValidator(user), put)

module.exports = router
