const request = require('supertest')
const { expect } = require('chai')
const { User } = require('../database/models')
const app = require('../app')
const api = request(app)

describe('Authenticate a user', () => {
  // test model
  const testNewUser = {
    firstName: 'testName',
    lastName: 'testUser',
    email: 'test1@gmail.com',
    password: '1234567aA*',
  }

  const wrongUser = {
    firstName: '',
    lastName: '**',
    email: 'abc',
    password: '01',
  }

  // delete the test model from the database
  after(async () => {
    await User.destroy({ where: { email: 'test1@gmail.com' } })
  })

  describe('POST /auth/register', () => {

    it('It should register a new user', async () => {
      const res = await api
        .post('/auth/register')
        .send(testNewUser)     
        expect('Content-Type', /application\/json/)
        expect(200)
        expect(res.body.status).to.equal(true)
        expect(res.body.message).to.equal('Users created successfully')
        expect(res.body.body).to.be.a('object')
        expect(res.body).to.have.property('token')
    })

    it('It should return a 403 error', async () => {
      await api
        .post('/auth/register')
        .send(wrongUser)  
    })

  })
})
