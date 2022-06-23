const createHttpError = require('http-errors')

const { create, getContacts } = require('../services/contacts')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    const { body } = req
    try {
      const response = await create(body)
      endpointResponse({
        res,
        message: 'contact created successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating contact] - [contact - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getContacts()
      endpointResponse({
        res,
        message: 'Contacts retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating contact] - [contact - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
