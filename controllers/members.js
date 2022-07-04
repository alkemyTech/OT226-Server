const createHttpError = require('http-errors')
const { deleteMember } = require('../services/members')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteMember(req.params.id)
      endpointResponse({
        res,
        message: 'Member deleted successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting member] - [members - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
