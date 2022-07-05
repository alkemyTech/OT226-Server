const express = require('express')
// const { schemaValidator } = require('../middlewares/validator')
// const { putTestimonial } = require('../schemas/testimonial')
const { put } = require('../controllers/testimonials')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.put('/:id', verifyUsers, isAdmin, /* schemaValidator(putTestimonial), */ put)

module.exports = router
