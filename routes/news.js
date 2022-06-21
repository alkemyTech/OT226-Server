const express = require('express')

const { post } = require('../controllers/news')
const { createNew } = require('../schemas/new')

const router = express.Router()

router.post('/', createNew, post)

module.exports = router
