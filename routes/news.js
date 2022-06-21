const express = require('express')

const { get } = require('../controllers/news')

const router = express.Router()

router.get('/:id', get)

module.exports = router
