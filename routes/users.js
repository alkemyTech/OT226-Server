const router = require('express').Router()
const { getList } = require('../controllers/users')

// /users
router.get('/', getList) // obtain the list of users

module.exports = router
