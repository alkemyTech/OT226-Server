const router = require('express').Router()

const { schemaValidator } = require('../middlewares/validator')
const {
  post, put, destroy, get,
} = require('../controllers/comments')
const { verifyUsers } = require('../middlewares/auth')
const { comment } = require('../schemas/comment')
const { ownerComments } = require('../middlewares/ownerComments')

router.get('/', get)
router.post('/', verifyUsers, schemaValidator(comment), post)
router.put('/:id', verifyUsers, ownerComments, put)
router.delete('/:id', verifyUsers, destroy)

module.exports = router
