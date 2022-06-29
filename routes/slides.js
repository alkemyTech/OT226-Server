const express = require('express')
// const { schemaValidator } = require('../middlewares/validator')
const { get, getSlideById } = require('../controllers/slides')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.get('/', verifyUsers, isAdmin, get)
router.get('/:id', verifyUsers, isAdmin, getSlideById)

module.exports = router
