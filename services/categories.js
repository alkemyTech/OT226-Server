const { ErrorObject } = require('../helpers/error')
const { Category } = require('../database/models')

// example of a service
exports.getAll = async () => {
  try {
    const getCategory = await Category.findAll({
      attributes: ['name'],
    })
    if (!getCategory) {
      throw new ErrorObject('No index found', 404)
    }
    return getCategory
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
