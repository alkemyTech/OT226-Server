const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../services/categories')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getCategories(req)
      endpointResponse({
        res,
        message: 'Categories retrieved successfully',
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
  getCategoryById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await getCategoryById(id)
      endpointResponse({
        res,
        message: 'Category retrieved successfully',
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
    const { body } = req
    try {
      const response = await createCategory(body)
      endpointResponse({
        res,
        message: 'Category successfully created',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating category] - [category - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  put: catchAsync(async (req, res, next) => {
    const { body } = req
    const { id } = req.params
    try {
      const response = await updateCategory(body, id)
      return endpointResponse({
        res,
        message: 'Category successfully update',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error update category] - [category - PUT]: ${error.message}`,
      )
      return next(httpError)
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteCategory(req.params.id)
      endpointResponse({
        res,
        message: 'Category deleted successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting category] - [category - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
