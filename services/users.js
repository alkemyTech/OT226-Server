const { ErrorObject } = require('../helpers/error')
const { User } = require('../database/models')
const bcrypt = require('bcrypt')

module.exports = {
  // query in the database in the users model
  getUsers: async () => {
    try {
      const users = await User.findAll()
      if (!users || users.length === 0) {
        throw new ErrorObject('No users found', 404)
      }
      return users
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500)
    }
  },
  destroyUser: async (id) => {
    try {
      const user = await User.destroy({ where: { id } })
      if (!user || user.length === 0) {
        throw new ErrorObject('No user found', 404)
      }
      return user
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500)
    }
  },
  loginUser: async ({ email, password }) => {
    try {
      const user = await User.findOne({ where: { email } }) //! where
      const validatePass = user && bcrypt.compareSync(password, user.password)
      if (!user || !validatePass) throw new ErrorObject('Invalid credentials', 401)
      return user
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500)
    }
  },
}
