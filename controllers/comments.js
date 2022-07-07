const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { createComment, updateComments } = require('../services/comments')

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
}
