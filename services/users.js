const { ErrorObject } = require('../helpers/error')
const { User } = require('../database/models')

// query in the database in the users model
exports.getUsers = async () => {
  try {
    const users = await User.findAll()
    if (!users || users.length === 0) {
      throw new ErrorObject('No users found', 404)
    }
    return users
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
// getUserByMail, se la paso al register
// query in the database in the users model
exports.registerUser = async (registerInformation) => {
  try {
    const user = await User.create(registerInformation)
    if (!user || user.length === 0) {
      throw new ErrorObject('User not created', 404)
    }
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
