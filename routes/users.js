const router = require('express').Router()

const { schemaValidator } = require('../middlewares/validator')
const { user } = require('../schemas/user')
const { verifyUsers } = require('../middlewares/auth')

const { get, put, destroy } = require('../controllers/users')

// /users
router.put('/:id', schemaValidator(user), put)
router.get('/', get)
router.delete('/:id', verifyUsers, destroy)

module.exports = router
