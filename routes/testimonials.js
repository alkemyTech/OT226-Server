const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { postTestimonial } = require('../schemas/testimonial')
const { put, post, destroy } = require('../controllers/testimonials')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.put('/:id', verifyUsers, isAdmin, /* schemaValidator(putTestimonial), */ put)
router.post('/', verifyUsers, isAdmin, schemaValidator(postTestimonial), post)
router.delete('/:id', verifyUsers, isAdmin, destroy)

module.exports = router
