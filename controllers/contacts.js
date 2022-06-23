const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getContacts } = require('../services/contacts')

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
        `[Error retrieving contacts] - [contacts - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
