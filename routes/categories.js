const express = require('express')

const { get, getCategory } = require('../controllers/categories')

const router = express.Router()

router.get('/:id', getCategory)
router.get('/', get)

module.exports = router
