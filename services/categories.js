const { ErrorObject } = require('../helpers/error')
const { Category } = require('../database/models')

// example of a service
exports.getCategories = async (req) => {
  const getUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
  const page = Number.parseInt(req.query.page, 10) || 1
  const info = { next: null, prev: null }
  const limit = 10
  const offset = page > 0 ? (page - 1) * limit : 0

  if (page) {
    if (page > 1) {
      info.prev = `${getUrl}?page=${Number(page) - 1}`
      info.next = `${getUrl}?page=${Number(page) + 1}`
    } else {
      info.prev = null
      info.next = `${getUrl}?page=${Number(page) + 1}`
    }
  } else {
    info.prev = null
    info.next = `${getUrl}?page=2`
  }

  try {
    const { count, rows: categories } = await Category.findAndCountAll({ offset, limit })
    const totalPages = Math.ceil(count / limit)
    if (totalPages < page || page === 0) throw new ErrorObject('Categories not found', 404)

    const allNews = {
      prev: info.prev,
      next: `${totalPages > page ? info.next : null}`,
      currentPage: page,
      totalPages,
      categories,
    }
    return allNews
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

exports.deleteCategory = async (idCategory) => {
  try {
    const category = await Category.destroy({ where: { id: idCategory } })
    if (!category || category.length === 0) {
      throw new ErrorObject('No category found', 404)
    }
    return category
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
