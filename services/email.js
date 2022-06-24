const sgMail = require('@sendgrid/mail')
const read = require('fs')
const ejs = require('ejs')
const { join } = require('path')

exports.sendEmailTo = async (email, data) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  // we use welcome template here
  const str = read.readFileSync(join(__dirname, '../views/welcomeTemplate.ejs'), 'utf-8')
  const body = ejs.render(str)(data)
  const msg = {
    to: email, // Change to your recipient
    from: data.email, // Change to your verified sender
    subject: data.subject,
    text: 'OT226-28',
    html: body,
  }
  try {
    // send email
    await sgMail.send(msg)
    console.log('Email sent') // eslint-disable-line
  } catch (error) {
    console.error(error) // eslint-disable-line    
  }
}
