const createHttpError = require('http-errors')
const bcrypt = require('bcrypt')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  getUsers,
  destroyUser,
  registerUser,
  loginUser,
  putUserDataById,
  getUserById,
} = require('../services/users')
const { decryptJWT } = require('../helpers/jwt')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const users = await getUsers()
      endpointResponse({
        res,
        message: 'Users list retrieved successfully',
        body: users,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users list] - [users - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  post: catchAsync(async (req, res, next) => {
    try {
      const { body } = req

      const encryptedPassword = bcrypt.hashSync(body.password, 10)
      body.password = encryptedPassword
      body.roleId = 1

      const users = await registerUser(body)
      endpointResponse({
        res,
        message: 'Users created successfully',
        body: users.user,
        token: users.token,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating user] - [users - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await destroyUser(id)
      endpointResponse({
        res,
        message: 'User deleted successfully',
        body: user,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user delete] - [user - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  login: catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    try {
      const user = await loginUser({ email, password })
      endpointResponse({
        res,
        message: 'User logged in successfully',
        body: user,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user] - [user - POST]: ${error.message} : { OK : FALSE } `,
      )
      next(httpError)
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const {
        firstName, lastName, email, password, photo,
      } = req.body
      const hastPass = bcrypt.hashSync(password, 10)
      const user = await putUserDataById(id, firstName, lastName, email, hastPass, photo)
      endpointResponse({
        res,
        message: 'User updated successfully',
        body: user,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user delete] - [user - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  getUserByToken: catchAsync(async (req, res, next) => {
    const { id } = decryptJWT(req.headers)
    try {
      const user = await getUserById(id)
      endpointResponse({
        res,
        message: 'User successfully',
        body: user,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user Information] - [user - me]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
