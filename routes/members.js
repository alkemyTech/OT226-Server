const router = require('express').Router()

const { get } = require('../controllers/members')

router.get('/', get)

module.exports = router
