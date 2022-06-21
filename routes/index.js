const express = require('express')
const { get } = require('../controllers/index')
const usersRouter = require('./users')
const organizationRouter = require('./organizations')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)

// users route handler
router.use('/users', usersRouter)

router.use('/organization', organizationRouter)

module.exports = router
