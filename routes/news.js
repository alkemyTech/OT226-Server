const express = require('express')

const { schemaValidator } = require('../middlewares/validator')
const { news } = require('../schemas/new')
const { post } = require('../controllers/news')

const router = express.Router()

router.post('/', schemaValidator(news), post)

module.exports = router
