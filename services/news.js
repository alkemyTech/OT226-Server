const { ErrorObject } = require('../helpers/error')

const { New } = require('../database/models')

exports.create = async (data) => {
  const {
    name, content, image, categoryId,
  } = data
  try {
    const entrada = await New.create({
      name,
      content,
      image,
      categoryId,
      type: 'new',
    })
    return entrada
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
