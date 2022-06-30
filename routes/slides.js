const express = require('express')
// const { schemaValidator } = require('../middlewares/validator')
const { get, post } = require('../controllers/slides')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { localUpload } = require('../services/aws')

const router = express.Router()

router.get('/', verifyUsers, isAdmin, get)
router.post('/', localUpload, post)

module.exports = router
