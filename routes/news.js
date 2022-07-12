const express = require('express')

const { schemaValidator } = require('../middlewares/validator')
const { news, idNews } = require('../schemas/new')
const {
  post, get, getById, destroy, put, getWithComments,
} = require('../controllers/news')
const { isAdmin } = require('../middlewares/isAdmin')
const { verifyUsers } = require('../middlewares/auth')

const router = express.Router()

router.get('/', get)
router.post('/', verifyUsers, isAdmin, schemaValidator(news), post)
router.get('/:id', getById)
router.delete('/:id', verifyUsers, isAdmin, destroy)
router.put('/:id', verifyUsers, isAdmin, put)
router.get('/:id/comments', verifyUsers, schemaValidator(idNews), getWithComments)

module.exports = router
