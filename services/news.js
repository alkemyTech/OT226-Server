const { ErrorObject } = require('../helpers/error')
const { New, Category } = require('../database/models')

// example of a service
exports.getNew = async (idNew) => {
  try {
    const getNews = await New.findOne({
      where: { id: idNew },
      attributes: ['name', 'content', 'image'],
      include: { model: Category },
    })
    if (!getNews) {
      throw new ErrorObject('No index found', 404)
    }
    return getNews
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
