const express = require('express')

const { schemaValidator } = require('../middlewares/validator')
const { contacts } = require('../schemas/contacts')
const { post, get } = require('../controllers/contacts')

const router = express.Router()

router.post('/', schemaValidator(contacts), post)
router.get('/', get)

module.exports = router
