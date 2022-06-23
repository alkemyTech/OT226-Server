const express = require('express')

const schemaValidator = require('../middlewares/validator')
const { contacts } = require('../schemas/contacts')
const { post } = require('../controllers/contacts')

const router = express.Router()

router.post('/', schemaValidator(contacts), post)

module.exports = router
