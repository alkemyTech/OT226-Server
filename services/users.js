const bcrypt = require('bcrypt')
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
<<<<<<< HEAD
// getUserByMail, se la paso al register
// query in the database in the users model
exports.registerUser = async (registerInformation) => {
  try {
    const user = await User.create(registerInformation)
=======

exports.destroyUser = async (id) => {
  try {
    const user = await User.destroy({ where: { id } })
    if (!user || user.length === 0) {
      throw new ErrorObject('No user found', 404)
    }
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ where: { email } })
    const validatePass = user && bcrypt.compareSync(password, user.password)
    if (!user || !validatePass) throw new ErrorObject('Invalid credentials', 401)
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

// query in the database in the users model
exports.registerUser = async (body) => {
  try {
    const prevUser = await this.getUserByMail(body.email)
    if (prevUser) {
      throw new ErrorObject('Email already exists', 404)
    }
    const user = await User.create(body)
>>>>>>> 213c84dc73e9336683e68ab02fd4593650d4c1a1
    if (!user || user.length === 0) {
      throw new ErrorObject('User not created', 404)
    }
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
<<<<<<< HEAD
  },
exports.destroyUser = async (id) => {
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
=======
}

exports.getUserByMail = async (email) => {
  const user = await User.findOne({
    where: { email },
  })

  return user
>>>>>>> 213c84dc73e9336683e68ab02fd4593650d4c1a1
}
