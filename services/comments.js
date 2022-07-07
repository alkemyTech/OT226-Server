const { ErrorObject } = require('../helpers/error')
const { Comment } = require('../database/models')

exports.updateComments = async (req) => {
  const { id } = req.params
  try {
    const searchComment = await Comment.findOne({ where: { id } })
    if (!searchComment || searchComment.length === 0) throw new ErrorObject('Comment not found', 404)

    const editComment = await Comment.update(req.body, { where: { id } })
    return editComment
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
