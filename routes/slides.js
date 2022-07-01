const express = require('express')
const {
  get, post, getSlideById, destroy, put,
} = require('../controllers/slides')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { localUpload } = require('../services/aws')

const router = express.Router()

router.get('/', verifyUsers, isAdmin, get)
router.post('/', localUpload, post)
router.get('/:id', getSlideById)
router.delete('/:id', verifyUsers, isAdmin, destroy)
router.put('/:id', verifyUsers, isAdmin, localUpload, put)

module.exports = router
