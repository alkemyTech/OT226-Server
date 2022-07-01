const createHttpError = require('http-errors')
const {
  getSlides, createSlider, getSlideById, deleteSlide, updateSlide,
} = require('../services/slides')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { uploadImage } = require('../services/aws')
const { enCode64 } = require('../helpers/enCode64')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getSlides()
      endpointResponse({
        res,
        message: 'slides retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving index] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  post: catchAsync(async (req, res, next) => {
    try {
      const { order, text, organizationId } = req.body
      const finalImg = enCode64(req.file)
      const uploadedImageRoute = await uploadImage(finalImg, false)

      const slides = {
        imageUrl: uploadedImageRoute,
        order,
        text,
        organizationId,
      }
      const response = await createSlider(slides)
      endpointResponse({
        res,
        message: 'Slides created successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error Slides created] - [slides - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  getSlideById: catchAsync(async (req, res, next) => {
    try {
      const response = await getSlideById(req.params.id)
      endpointResponse({
        res,
        message: 'slide retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving slide] - [Slide - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteSlide(req.params.id)
      endpointResponse({
        res,
        message: 'slides deleted succesfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting Slide] - [index - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const { order, text, organizationId } = req.body
      const finalImg = enCode64(req.file)
      const uploadedImageRoute = await uploadImage(finalImg, false)
      const slides = {
        imageUrl: uploadedImageRoute,
        order,
        text,
        organizationId,
      }
      const response = await updateSlide(slides, req.params.id)
      endpointResponse({
        res,
        message: 'slide updated successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating slide] - [Slide - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
