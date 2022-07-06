const router = require('express').Router()

const { get } = require('../controllers/comments')

router.get('/', get)

module.exports = router
