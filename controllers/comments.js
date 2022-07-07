const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { createComment, updateComments, deleteComment } = require('../services/comments')
const { decodeJWT } = require('../helpers/jwt')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    const { body } = req
    try {
      const response = await createComment(body)
      endpointResponse({
        code: 201,
        res,
        message: 'Comment successfully created',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating comment] - [comment - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const response = await updateComments(req)
      endpointResponse({
        res,
        message: 'Comment successfully updated',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating comment] - [comments - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
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
        error.statusCode,
      )
      next(httpError)
    }
  }),
}
