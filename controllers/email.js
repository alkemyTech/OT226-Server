const { sendEmailTo } = require('../services/email')
const { getOrganizations } = require('../services/organization')

module.exports = {
  /**
   *
   * @param {string} emailUser
   */
  welcomeEmail: async (emailUser) => {
    try {
      // should implement a service of organization ById to get fields
      const [organization2] = await getOrganizations()
      const {
        image,
        name,
        phone,
        email = 'here email ong',
        welcomeText = 'here welcome text',
        address,
      } = organization2
      // this data is to send variables to welcome template
      const data = {
        img: image,
        nameOrganization: name,
        welcomeText,
        contact: `address: ${address} - phone: ${phone} - email: ${email}`,
        subject: `welcome to ${name}`,
      }
      const templatePath = '../views/welcomeTemplate.ejs'
      // here we use the email service
      await sendEmailTo(emailUser, data, templatePath)
    } catch (error) {
      console.error(error) // eslint-disable-line
    }
  },
  /**
   *
   * @param {string} emailUser
   */
  thankYouEmail: async (emailUser) => {
    try {
      // should implement a service of organization ById to get fields
      // this data is to send variables to welcome template
      const text = 'Thank you for contacting us!'
      const data = {
        text,
        subject: 'Thanks for your Contact!',
      }
      const templatePath = '../views/welcomeTemplate.ejs'
      // here we use the email service
      await sendEmailTo(emailUser, data, templatePath)
    } catch (error) {
      console.error(error) // eslint-disable-line
    }
  },
}
