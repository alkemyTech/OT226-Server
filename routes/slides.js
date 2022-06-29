const express = require('express')
// const { schemaValidator } = require('../middlewares/validator')
const { get } = require('../controllers/slides')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.get('/', verifyUsers, isAdmin, get)

module.exports = router
