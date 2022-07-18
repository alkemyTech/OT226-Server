const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')

describe('GET /organization/public', () => {
  it('Get organizations data', async () => {
    const { body } = await request(app)
      .get('/organization/public')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    const { code, status, message, body: resBody } = body
    expect(code).to.be.a('number')
    expect(code).to.equal(200)
    expect(status).to.be.true
    expect(message).to.be.a('string')
    expect(message).to.equal('Organizations retrieved successfully')
    expect(resBody).to.be.an('array')
  })
})

describe('PUT /organization/public/:id', () => {
  let token
  let userId
  const putOrganization = {
    image: 'https://nntheblog.b-cdn.net/wp-content/uploads/2022/02/Hisoka-1.jpg',
    address: 'Calle 123',
    phone: 12345,
    name: 'new name',
  }
  before(async () => {
    const { body } = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'garcia.dangello@gmail.com',
        password: 'Hola123.',
      })
      .expect('Content-Type', /json/)

    const { body: bodyRes } = body
    token = bodyRes.token
    userId = bodyRes.id
  })

  it('Error updating organization data', async () => {
    const { error } = await request(app)
      .put('/organization/public/4')
      .send(putOrganization)
      .set('Authorization', token)
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /text\/html/)
      .expect(500)

    const { status, message } = error
    expect(status).to.be.a('number')
    expect(status).to.equal(500)
    expect(message).to.be.a('string')
    expect(message).to.contain('cannot PUT /organization/public/4')
  })
})
