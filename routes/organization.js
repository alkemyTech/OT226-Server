const express = require('express')

const { get } = require('../controllers/organizations')

const router = express.Router()

router.get('/public', get)

module.exports = router
