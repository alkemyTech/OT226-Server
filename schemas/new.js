const { check } = require('express-validator')
const validateResults = require('../helpers/handleValidator')

const createNew = [
  check('name').exists().notEmpty(),
  check('content').exists().notEmpty(),
  check('image').exists().notEmpty(),
  check('categoryId').exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
]

module.exports = {
  createNew,
}
