const express = require('express')

const { get, getCategoryById } = require('../controllers/categories')

const router = express.Router()

router.get('/:id', getCategoryById)
router.get('/', get)

module.exports = router
