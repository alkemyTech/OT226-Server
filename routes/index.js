const express = require('express')
const { get } = require('../controllers/index')
const organizationRouter = require('./organization')
const categoryRouter = require('./categories')
const newsRouter = require('./news')
const userRouter = require('./users')
const authRouter = require('./auth')

const router = express.Router()

router.get('/', get)

router.use('/organization', organizationRouter)
router.use('/categories', categoryRouter)
router.use('/news', newsRouter)
router.use('/users', userRouter)
router.use('/auth', authRouter)

module.exports = router
