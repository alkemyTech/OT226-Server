const { ErrorObject } = require('../helpers/error')
const { User } = require('../database/models')

module.exports = {
  // query in the database in the users model
  getUserList: async () => {
    try {
      const users = await User.findAll({ attributes: { exclude: ['password'] } })
      if (!users || users.length === 0) {
        throw new ErrorObject('No users found', 404)
      }
      return users
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500)
    }
  },
}
