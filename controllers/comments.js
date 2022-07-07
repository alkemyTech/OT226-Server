const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { deleteComment } = require('../services/comments')
const { decodeJWT } = require('../helpers/jwt')

// example of a controller. First call the service, then build the controller method
module.exports = {
  destroy: catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { id: userId, roleId } = decodeJWT(req.headers)
    try {
      const response = await deleteComment(id, userId, roleId)
      endpointResponse({
        res,
        message: 'Comment deleted successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting comment] - [comment - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
