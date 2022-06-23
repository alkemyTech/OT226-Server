const router = require('express').Router()

const { schemaValidator } = require('../middlewares/validator')
const { user } = require('../schemas/user')

const { get, put } = require('../controllers/users')

// /users
router.put('/:id', schemaValidator(user), put)
router.get('/', get)

module.exports = router
