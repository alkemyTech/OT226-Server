const express = require('express')

const { schemaValidator } = require('../middlewares/validator')
const { news } = require('../schemas/new')
const { post, get } = require('../controllers/news')

const router = express.Router()

router.post('/', schemaValidator(news), post)
router.get('/:id', get)

module.exports = router
