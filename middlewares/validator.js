const { checkSchema } = require('express-validator')
const { handleValidator } = require('../helpers/handleValidator')

const schemaValidator = (schema) => [
  checkSchema(schema),
  (req, res, next) => {
    handleValidator(req, res, next)
  },
]

module.exports = schemaValidator
