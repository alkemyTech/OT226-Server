const { ErrorObject } = require('../helpers/error')
const { Organization } = require('../database/models')

// example of a service
exports.getPublicOrganizations = async () => {
  try {
    const getPublicOrganizations = await Organization.findAll({
      attributes: ['image', 'phone', 'address'],
    })
    if (!getPublicOrganizations) {
      throw new ErrorObject('No index found', 404)
    }
    return getPublicOrganizations
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
