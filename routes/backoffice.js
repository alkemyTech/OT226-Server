const express = require('express')
const { get } = require('../controllers/contacts')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.get('/contacts', verifyUsers, isAdmin, get)

module.exports = router
