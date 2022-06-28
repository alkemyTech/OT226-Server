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

exports.deleteNews = async (idNew) => {
  try {
    const news = await New.destroy({ where: { id: idNew } })
    if (!news || news.length === 0) {
      throw new ErrorObject('No index found', 404)
    }
    return news
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateNews = async (req) => {
  const { id } = req.params
  try {
    const searchNews = await New.findOne({ where: { id } })
    if (!searchNews || searchNews.length === 0) throw new ErrorObject('News not found', 404)

    const updatedNews = await New.update(req.body, { where: { id } })
    return updatedNews
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
