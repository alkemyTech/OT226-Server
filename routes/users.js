const router = require('express').Router()
const { get, destroy } = require('../controllers/users')

// /users
router.get('/', get)
router.delete('/:id', destroy)

module.exports = router
