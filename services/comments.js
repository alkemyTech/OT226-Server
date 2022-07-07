const { ErrorObject } = require('../helpers/error')
const { Comment } = require('../database/models')

// example of a service
exports.deleteComment = async (id, userId, roleId) => {
  try {
    const confirmRole = await Comment.findOne({ where: { id } })
    if (!confirmRole || confirmRole.length === 0) throw new ErrorObject('No comment found', 404)
    if (confirmRole.userId === userId || roleId === 2) {
      const comment = await Comment.destroy({ where: { id } })
      return comment
    }
    throw new ErrorObject('Forbidden', 403)
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
