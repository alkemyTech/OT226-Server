const express = require('express')

const { getPublic } = require('../controllers/organizations')

const router = express.Router()

router.get('/public', getPublic)

module.exports = router
