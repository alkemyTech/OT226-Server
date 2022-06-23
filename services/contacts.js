const { ErrorObject } = require('../helpers/error')
const { Contact } = require('../database/models')

// example of a service
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
