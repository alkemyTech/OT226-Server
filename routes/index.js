const express = require('express')
const { get } = require('../controllers/index')
const organizationRouter = require('./organization')
const categoryRouter = require('./categories')
const userRouter = require('./users')
const newRouter = require('./news')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)

router.use('/organization', organizationRouter)
router.use('/categories', categoryRouter)
router.use('/users', userRouter)
router.use('/news', newRouter)

module.exports = router
