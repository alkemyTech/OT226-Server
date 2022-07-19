const request = require('supertest')
const { expect } = require('chai')
const { User } = require('../database/models')
const app = require('../app')
const api = request(app)

describe('Test Authenticate a user /auth', () => {
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

  let token

  describe('POST /auth/register', () => {
    it('POST [SUCCESS] - It should register a new user', async () => {
      const res = await api
        .post('/auth/register')
        .send(testNewUser)     
        expect('Content-Type', /application\/json/)
        expect(res.body.code).to.be.a('number').equal(200)
        expect(res.body.status).to.be.a('boolean').equal(true)
        expect(res.body.message).to.be.a('string').equal('Users created successfully')
        expect(res.body.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        token = res.body.token
    })
  })

  describe('POST /auth/register with errors', () => {
    it('POST [ERROR] - It should return a 403 error', async () => {
      const res = await api
        .post('/auth/register')
        .send(wrongUser)  
        expect('Content-Type', /application\/json/)
        expect(res.status).to.be.a('number').equal(403)
        expect(res.forbidden).to.be.a('boolean').equal(true)
        expect(res.body.errors).to.be.an('array')
    })
  })

  describe('POST /auth/register with an existing user', () => {
    it('POST [ERROR] - It should return a 404 error', async () => {
      const res = await api
        .post('/auth/register')
        .send(testNewUser)  
        expect('Content-Type', /application\/json/)
        expect(res.status).to.be.a('number').equal(404)
        expect(res.notFound).to.be.a('boolean').equal(true)
        expect(res.type).to.be.a('string').equal('text/html')
        expect(res).to.have.property('text').includes('Email already exists')
    })
  })


  describe('POST /auth/login', () => {
    it('POST [SUCCESS] - It should login a user', async () => {
      const res = await api
        .post('/auth/login')
        .send({ email: testNewUser.email, password: testNewUser.password })  
        expect('Content-Type', /application\/json/)
        expect(res.body.code).to.be.a('number').equal(200)
        expect(res.body.status).to.be.a('boolean').equal(true)
        expect(res.body.message).to.be.a('string').equal('User logged in successfully')
        expect(res.body.body).to.be.a('object')
        expect(res.body.body).to.have.property('token')
    })
  })

  describe('POST /auth/login with errors', () => {
    it('POST [ERROR] - It should return a 401 error', async () => {
      const res = await api
        .post('/auth/login')
        .send({ email: testNewUser.email, password: '000000' })  
        expect('Content-Type', /application\/json/)
        expect(res.status).to.be.a('number').equal(401)
        expect(res.unauthorized).to.be.a('boolean').equal(true)
        expect(res.type).to.be.a('string').equal('text/html')
        expect(res).to.have.property('text').includes('Invalid credentials')
    })
  })

  describe('GET /auth/me', () => {
    it('GET [SUCCESS] - It should return a user data', async () => {
      const res = await api
        .get('/auth/me')
        .set('Authorization', token)
        expect('Content-Type', /application\/json/)
        expect(res.body.code).to.be.a('number').equal(200)
        expect(res.body.status).to.be.a('boolean').equal(true)
        expect(res.body.message).to.be.a('string').equal('User successfully')
        expect(res.body.body).to.be.a('object')
    })
  })

  describe('GET /auth/me without headers', () => {
    it('GET [ERROR] - It should return 403 error', async () => {
      const res = await api
        .get('/auth/me')
        expect('Content-Type', /application\/json/)
        expect(res.status).to.be.a('number').equal(403)
        expect(res.forbidden).to.be.a('boolean').equal(true)
        expect(res.type).to.be.a('string').equal('text/html')
        expect(res).to.have.property('text').includes('jwt must be provided')
    })
  })

})
