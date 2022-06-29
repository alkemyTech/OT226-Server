const { ErrorObject } = require('../helpers/error')
const { Category } = require('../database/models')

// example of a service
exports.getCategories = async () => {
  try {
    const getCategories = await Category.findAll({
      attributes: ['name'],
    })
    if (!getCategories) {
      throw new ErrorObject('No index found', 404)
    }
    return getCategories
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getCategoryById = async (id) => {
  try {
    const categoryById = await Category.findOne({
      where: { id },
    })

    if (!categoryById) {
      throw new ErrorObject('Category not found', 404)
    }
    return categoryById
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.createCategory = async (name) => {
  try {
    const createCategory = await Category.create(name)
    return createCategory
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateCategory = async (body, id) => {
  const { name, description, image } = body
  try {
    const category = await Category.findOne({
      where: { id },
    })
    if (!category) {
      throw new ErrorObject('No index found', 404)
    }
    const response = await Category.update(
      {
        name,
        description,
        image,
      },
      {
        where: {
          id,
        },
      },
    )
    return response
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
