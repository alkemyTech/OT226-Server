const router = require('express').Router()

const { post } = require('../controllers/members')
const { schemaValidator } = require('../middlewares/validator')
const { member } = require('../schemas/member')

// members
router.post('/', schemaValidator(member), post)

module.exports = router
