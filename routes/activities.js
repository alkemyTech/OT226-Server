const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { activity } = require('../schemas/activity')
const { post, put } = require('../controllers/activities')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.post('/', schemaValidator(activity), post)
router.put('/:id', verifyUsers, isAdmin, schemaValidator(activity), put)

module.exports = router
