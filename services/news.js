const { ErrorObject } = require('../helpers/error')

const { New, Category } = require('../database/models')

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

exports.getNews = async (idNew) => {
  try {
    const getNew = await New.findOne({
      where: { id: idNew },
      attributes: ['name', 'content', 'image'],
      include: { model: Category },
    })
    if (!getNew) {
      throw new ErrorObject('No index found', 404)
    }
    return getNew
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
