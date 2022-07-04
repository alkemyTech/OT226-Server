const createHttpError = require('http-errors')
const { getOrganizations, putOrganization } = require('../services/organization')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { uploadImage } = require('../services/aws')
const { getSlideByOrder } = require('../services/slides')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const organizations = await getOrganizations()
      const slides = await getSlideByOrder()
      endpointResponse({
        res,
        message: 'Organizations retrieved successfully',
        body: [organizations, slides],
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const { address, phone, name } = req.body
      const image = req.file
      const deleteLocal = true

      const uploadedImageRoute = await uploadImage(image, deleteLocal)

      const body = {
        image: uploadedImageRoute,
        address,
        phone,
        name,
      }
      const response = await putOrganization(id, body)
      endpointResponse({
        res,
        message: 'Organization updated successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
