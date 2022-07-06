const { ErrorObject } = require('../helpers/error')
const { Comment } = require('../database/models')

// example of a service
exports.createComment = async (body) => {
  try {
    const createComment = await Comment.create(body)
    return createComment
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
