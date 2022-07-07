const router = require('express').Router()

const {
  get, post, destroy, put,
} = require('../controllers/members')
const { schemaValidator } = require('../middlewares/validator')
const { member } = require('../schemas/member')
const { verifyUsers } = require('../middlewares/auth')

// members
router.get('/', get)
router.post('/', schemaValidator(member), post)
router.delete('/:id', verifyUsers, destroy)
router.put('/:id', verifyUsers, put)

module.exports = router
