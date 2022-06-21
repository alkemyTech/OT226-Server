const { ErrorObject } = require('../helpers/error')
const { Category } = require('../database/models')

exports.getCategories = async ({ id }) => {
  try {
    const getCategories = await Category.findAll({
      attributes: ['name'],
    })
    const getCategory = await Category.findOne({
      where:{ id }
    })

    if(!getCategory) {
      throw new ErrorObject('Category not found', 404)
    }else if(getCategory && !getCategories){
      return getCategory
    }else if (!getCategory && !getCategories) {
      throw new ErrorObject('No index found', 404)
    }
    return getCategories
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
