const express = require('express')

const { schemaValidator } = require('../middlewares/validator')
const { news } = require('../schemas/new')
const {
  post, get, destroy, put,
} = require('../controllers/news')
const { isAdmin } = require('../middlewares/isAdmin')
const { verifyUsers } = require('../middlewares/auth')

const router = express.Router()

router.post('/', verifyUsers, isAdmin, schemaValidator(news), post)
router.get('/:id', get)
router.delete('/:id', verifyUsers, isAdmin, destroy)
router.put('/:id', verifyUsers, isAdmin, put)

module.exports = router
