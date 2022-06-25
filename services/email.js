const sgMail = require('@sendgrid/mail')
const read = require('fs')
const ejs = require('ejs')
const { join } = require('path')
/**
 *
 * @param {string} emailUser
 * @param {object} data - data contains the variables to send to welcome template
 */
exports.sendEmailTo = async (emailUser, data) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  // we use welcome template here
  const str = read.readFileSync(join(__dirname, '../views/welcomeTemplate.ejs'), 'utf-8')
  const body = ejs.render(str, data)
  const msg = {
    to: emailUser, // Change to your recipient
    from: 'nicolas.altomonte@gmail.com', // Change to your verified sender
    subject: data.subject,
    text: data.welcomeText,
    html: body,
  }
  try {
    // send email
    await sgMail.send(msg)
    console.log('Email sent') // eslint-disable-line
  } catch (error) {
    console.error('here',error) // eslint-disable-line    
  }
}
