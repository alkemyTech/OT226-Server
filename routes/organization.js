const express = require('express')

const { get, put } = require('../controllers/organizations')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { schemaValidator } = require('../middlewares/validator')
const { putOrganization } = require('../schemas/organization')

const router = express.Router()

router.get('/public', get)
router.put('/public/:id', [
  schemaValidator(putOrganization),
  verifyUsers,
  isAdmin,
], put)

module.exports = router
