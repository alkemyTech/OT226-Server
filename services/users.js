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
    if (!user || user.length === 0) {
      throw new ErrorObject('User not created', 404)
    }
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getUserByMail = async (email) => {
  const user = await User.findOne({
    where: { email },
  })

  return user
}

// User updated
exports.putUser = async (id, firstName, lastName, email, password, photo, newPassword) => {
  try {
    const user = await User.findOne({ where: { id } })
    const validatePass = bcrypt.compareSync(password, user.password)
    if (!user) {
      throw new ErrorObject('User not found', 404)
    } else if (!validatePass) {
      throw new ErrorObject('Password incorrect', 404)
    } else {
      const hashPass = bcrypt.hashSync(newPassword, 10)
      const userUpdated = await User.update(
        {
          firstName,
          lastName,
          email,
          password: hashPass,
          photo,
        },
        {
          where: { id },
        },
      )

      return userUpdated
    }
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
