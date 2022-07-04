const createHttpError = require('http-errors')
const { createMember } = require('../services/members')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const response = await createMember(req)
      endpointResponse({
        res,
        message: 'Member created successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating member] - [members - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
