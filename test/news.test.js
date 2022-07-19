const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')

describe('GET /news', () => {
  it('Get all news data', async () => {
    const { body } = await request(app)
      .get('/news')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    const { code, status, message, body: resBody } = body
    expect(code).to.be.a('number')
    expect(code).to.equal(200)
    expect(status).to.be.true
    expect(message).to.be.a('string')
    expect(message).to.equal('News retrieved successfully')
    expect(resBody).to.be.an('object')
  })
})

describe('POST /news', () => {
  let token
  let otherToken
  const postNews = {
    name: 'new name',
    image: 'https://nntheblog.b-cdn.net/wp-content/uploads/2022/02/Hisoka-1.jpg',
    content: 'Calle 123',
    categoryId: 1,
  }
  const badNew = {
    name: 'new name',
    image: 'https://nntheblog.b-cdn.net/wp-content/uploads/2022/02/Hisoka-1.jpg',
    categoryId: 1,
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
  })

  it('New created successfully', async () => {
    const { body } = await request(app)
      .post('/news')
      .send(postNews)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)

    const { code, status, message, body: resBody } = body
    expect(code).to.be.a('number')
    expect(code).to.equal(200)
    expect(status).to.be.true
    expect(message).to.be.a('string')
    expect(message).to.equal('new created successfully')
    expect(resBody).to.be.an('object')
  })

  it('Error creating a new', async () => {
    const error = await request(app)
      .post('/news')
      .send(badNew)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(403)

    expect(error).to.be.an('object')
  })

  beforeEach(async () => {
    const { body } = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'dangelloa.garcian@uqvirtual.edu.co',
        password: 'Hola123.',
      })
      .expect('Content-Type', /json/)

    const { body: bodyRes } = body
    otherToken = bodyRes.token
  })

  it('Access unauthorized creating a new', async () => {
    const res = await request(app)
      .post('/news')
      .send(postNews)
      .set('Authorization', otherToken)
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /text\/html/)
      .expect(401)

    expect(res).to.have.property('text').includes('Access - Denied')
  })
})

describe('GET /news/:id', () => {
  it('Get new data by id', async () => {
    const { body } = await request(app)
      .get('/news/8')
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /json/)
      .expect(200)
  
    const { code, status, message, body: resBody } = body
    expect(code).to.be.a('number')
    expect(code).to.equal(200)
    expect(status).to.be.true
    expect(message).to.be.a('string')
    expect(message).to.equal('new retrieved successfully')
    expect(resBody).to.be.an('object')
  })
})

describe('DELETE /news/:id', () => {
  let token
  let otherToken
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
  })
  
  it('New deleted successfully', async () => {
    const { body } = await request(app)
      .delete('/news/5')
      .set('Authorization', token)
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /json/)
      .expect(200)
  
    const { code, status, message, body: resBody } = body
    expect(code).to.be.a('number')
    expect(code).to.equal(200)
    expect(status).to.be.true
    expect(message).to.be.a('string')
    expect(message).to.equal('new deleted successfully')
    expect(resBody).to.be.a('number')
    expect(resBody).to.equal(1)
  })
  
  it('Error deleting a new', async () => {
    const res = await request(app)
      .delete('/news/1')
      .set('Authorization', token)
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /text\/html/)
      .expect(404)

    expect(res).to.have.property('text').includes('No index found')
  })
  
  beforeEach(async () => {
    const { body } = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'dangelloa.garcian@uqvirtual.edu.co',
        password: 'Hola123.',
      })
      .expect('Content-Type', /json/)
  
    const { body: bodyRes } = body
    otherToken = bodyRes.token
  })
  
  it('Access unauthorized deleting a new', async () => {
    const res = await request(app)
      .delete('/news/6')
      .set('Authorization', otherToken)
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /text\/html/)
      .expect(401)

    expect(res).to.have.property('text').includes('Access - Denied')
  })
})

describe('PUT /news/:id', () => {
  let token
  let otherToken
  const putNew = {
    content: 'modified content',
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
  })
    
  it('New updated successfully', async () => {
    const { body } = await request(app)
      .put('/news/7')
      .send(putNew)
      .set('Authorization', token)
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /json/)
      .expect(200)
    
    const { code, status, message, body: resBody } = body
    expect(code).to.be.a('number')
    expect(code).to.equal(200)
    expect(status).to.be.true
    expect(message).to.be.a('string')
    expect(message).to.equal('News updated successfully')
    expect(resBody).to.be.a('array')
  })
    
  it('Error updating a new', async () => {
    const res = await request(app)
      .put('/news/1')
      .send(putNew)
      .set('Authorization', token)
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /text\/html/)
      .expect(404)
  
    expect(res).to.have.property('text').includes('News not found')
  })
    
  beforeEach(async () => {
    const { body } = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'dangelloa.garcian@uqvirtual.edu.co',
        password: 'Hola123.',
      })
      .expect('Content-Type', /json/)
    
    const { body: bodyRes } = body
    otherToken = bodyRes.token
  })
    
  it('Access unauthorized updating a new', async () => {
    const res = await request(app)
      .put('/news/7')
      .send(putNew)
      .set('Authorization', otherToken)
      .set('Accept', 'text/html; charset=utf-8')
      .expect('Content-Type', /text\/html/)
      .expect(401)
  
    expect(res).to.have.property('text').includes('Access - Denied')
  })
})

describe('GET /news/:id/comments', () => {
    it('Get comments of a news item', async () => {
      const { body } = await request(app)
        .get('/news/8')
        .set('Accept', 'text/html; charset=utf-8')
        .expect('Content-Type', /json/)
        .expect(200)
    
      const { code, status, message, body: resBody } = body
      expect(code).to.be.a('number')
      expect(code).to.equal(200)
      expect(status).to.be.true
      expect(message).to.be.a('string')
      expect(message).to.equal('new retrieved successfully')
      expect(resBody).to.be.an('object')
    })
  })
