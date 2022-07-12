const router = require('express').Router()

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const { configSwagger } = require('../swagger/config')

// api/docs
const specs = swaggerJSDoc(configSwagger)
router.use('/', swaggerUI.serve, swaggerUI.setup(specs))

module.exports = router
