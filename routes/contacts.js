const express = require('express')

const { schemaValidator } = require('../middlewares/validator')
const { contacts } = require('../schemas/contacts')
const { post, get } = require('../controllers/contacts')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.post('/', schemaValidator(contacts), post)
router.get('/', verifyUsers, isAdmin, get)

module.exports = router
