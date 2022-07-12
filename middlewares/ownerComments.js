const { decryptJWT } = require('../helpers/jwt')
const { Comment } = require('../database/models')
const { ErrorObject } = require('../helpers/error')

exports.ownerComments = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await Comment.findByPk(id)
    if (!response) res.status(404).send('[Error - Comment not found]')
    const userId = response.dataValues.user_id
    const { id: tokenId, roleId } = decryptJWT(req.headers)

    if (roleId === 2 || tokenId === userId) return next()

    res.status(403).send('[Forbidden - does not have the necessary permissions] - [Access - Denied]')
    throw new ErrorObject('Forbidden', 403)
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
