const express = require('express')
// const { schemaValidator } = require('../middlewares/validator')
const { get, destroy } = require('../controllers/slides')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.get('/', verifyUsers, isAdmin, get)
router.delete('/:id', verifyUsers, isAdmin, destroy)

module.exports = router
