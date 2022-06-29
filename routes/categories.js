const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { category } = require('../schemas/category')
const {
  get, getCategoryById, post, put,
} = require('../controllers/categories')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.get('/:id', getCategoryById)
router.get('/', get)
router.post('/', schemaValidator(category), post)
router.put('/:id', verifyUsers, isAdmin, schemaValidator(category), put)

module.exports = router
