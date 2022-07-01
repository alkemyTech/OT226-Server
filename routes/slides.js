const express = require('express')
// const { schemaValidator } = require('../middlewares/validator')
const { get, getSlideById, destroy } = require('../controllers/slides')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.get('/', verifyUsers, isAdmin, get)
router.get('/:id', getSlideById)
router.delete('/:id', verifyUsers, isAdmin, destroy)

module.exports = router
