const express = require('express')

const { post } = require('../controllers/news')

const router = express.Router()

router.post('/', post)

module.exports = router
