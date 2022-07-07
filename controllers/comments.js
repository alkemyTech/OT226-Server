const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { updateComments } = require('../services/comments')

module.exports = {
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
