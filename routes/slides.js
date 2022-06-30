const express = require('express')
// const { schemaValidator } = require('../middlewares/validator')
const { get, getSlideById } = require('../controllers/slides')

const router = express.Router()

router.get('/', get)
router.get('/:id', getSlideById)

module.exports = router
