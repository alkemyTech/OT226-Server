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

exports.getContacts = async () => {
  try {
    const getContacts = await Contact.findAll()
    if (!getContacts || getContacts.length === 0) {
      throw new ErrorObject('No Contacts found', 404)
    }
    return getContacts
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
