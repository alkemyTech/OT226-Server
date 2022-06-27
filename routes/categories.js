const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { category } = require('../schemas/category')
const {
  get, getCategoryById, post, put, destroy,
} = require('../controllers/categories')
const { isAuthenticatedUser } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { verifyUsers } = require('../middlewares/auth')

const router = express.Router()

router.get('/:id', getCategoryById)
router.get('/', get)
router.post('/', schemaValidator(category), post)
router.put('/:id', isAuthenticatedUser, schemaValidator(category), put)
router.delete('/:id', verifyUsers, isAdmin, destroy)

module.exports = router
