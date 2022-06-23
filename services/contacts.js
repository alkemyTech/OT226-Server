const { ErrorObject } = require('../helpers/error')

const { Contact } = require('../database/models')

exports.create = async (data) => {
  const {
    name, phone, email, message,
  } = data
  try {
    const contacts = await Contact.create({
      name,
      phone,
      email,
      message,
    })
    return contacts
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
