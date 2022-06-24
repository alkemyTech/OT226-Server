const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { activity } = require('../schemas/activity')
const { post } = require('../controllers/activities')

const router = express.Router()

router.post('/', schemaValidator(activity), post)

module.exports = router
