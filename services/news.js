const { ErrorObject } = require('../helpers/error')

const { New, Category, Comment } = require('../database/models')

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

exports.getNewById = async (idNew) => {
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

exports.getWithComments = async (idNew) => {
  try {
    const getNews = await Comment.findAll({
      where: { news_id: idNew },
    })
    if (!getNews || getNews.length === 0) {
      throw new ErrorObject('No index found', 404)
    }
    return getNews
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getNews = async (req) => {
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
    const { count, rows: news } = await New.findAndCountAll({ offset, limit })
    const totalPages = Math.ceil(count / limit)
    if (totalPages < page || page === 0) throw new ErrorObject('News not found', 404)

    const allNews = {
      prev: info.prev,
      next: `${totalPages > page ? info.next : null}`,
      currentPage: page,
      totalPages,
      news,
    }
    return allNews
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
