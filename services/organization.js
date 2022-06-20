const { ErrorObject } = require('../helpers/error')
const { Organization } = require('../database/models')

// example of a service
exports.getOrganizations = async () => {
  try {
    const getOrganizations = await Organization.findAll({
      attributes: ['name', 'image', 'phone', 'address'],
    })
    if (!getOrganizations) {
      throw new ErrorObject('No index found', 404)
    }
    return getOrganizations
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
