const { ErrorObject } = require('../helpers/error')
const { Comment } = require('../database/models')

exports.getCommets = async () => {
  try {
    const getCommets = await Comment.findAll({
      attributes: ['body'],
      order: [
        ['createdAt', 'DESC'],
      ],
    })
    if (!getCommets) {
      throw new ErrorObject('No index found', 404)
    }
    return getCommets
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
