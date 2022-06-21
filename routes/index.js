const express = require('express')
const { get } = require('../controllers/index')
const organizationRouter = require('./organization')
const categoryRouter = require('./categories')
const newsRouter = require('./news')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)

// users route handler
router.use('/organization', organizationRouter)
router.use('/categories', categoryRouter)
router.use('/news', newsRouter)

module.exports = router
