const createHttpError = require('http-errors')
const bcrypt = require('bcrypt')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
<<<<<<< HEAD
const { getUsers, destroyUser, registerUser } = require('../services/users')
=======
const {
  getUsers, destroyUser, registerUser, loginUser,
} = require('../services/users')
>>>>>>> 213c84dc73e9336683e68ab02fd4593650d4c1a1

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
<<<<<<< HEAD
      const users = await registerUser(req.body)
=======
      const { body } = req

      const encryptedPassword = bcrypt.hashSync(body.password, 10)
      body.password = encryptedPassword
      body.roleId = 1

      const users = await registerUser(body)
>>>>>>> 213c84dc73e9336683e68ab02fd4593650d4c1a1
      endpointResponse({
        res,
        message: 'Users created successfully',
        body: users,
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
}
