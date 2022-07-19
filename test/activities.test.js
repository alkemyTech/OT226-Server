const request = require('supertest')
const { Activity } = require('../database/models')
const { expect } = require('chai')

const app = require('../app')

after(async () => {
  await Activity.destroy({where: {}})
})

describe('POST /activities', () => {
  let token;

  before(async () => {
    const { body } = await request(app).post('/auth/login')
    .set('Accept', 'application/json')  
    .send({
      email: 'user1@example.com',
      password: 'Abc&1234'
    })
    .expect('Content-Type', /json/)
  
    const { body:bodyRes } = body
    token = bodyRes.token
  })

  it('POST STATUS: 201 Create Activity',async () => {
    const { body } = await request(app).post('/activities')
    .send({
      name: 'Activity1',
      content: 'first activity',
      image: 'photo.png'
    })
    .set('Authorization', token)
    .set("Accept", "text/html; charset=utf-8")
    .expect("Content-Type", /json/)
    .expect(201)
    const { code, status, message, body: resBody } = body
    expect(code).to.be.a('number')
    expect(code).to.equal(201)
    expect(status).to.be.true
    expect(message).to.be.a('string')
    expect(resBody).to.be.an('object')
  })

  it('POST STATUS: 403 Error creating a activity',async () => {
    const error = await request(app).post('/activities')
    .send({
      name: 'Activity',
    })
    .set('Authorization', token)
    .set('Accept', 'text/html; charset=utf-8')
    .expect('Content-Type', /json/)
    .expect(403)
    expect(error).to.be.an('object')
  })
});

describe('PUT /activities/:id', async () => {
  let token, activityId;
  const data={
    name: 'ActivityUpdated',
    content: 'activity updated',
    image: 'photo1.png'
  }
  before(async () => {
    const { body } = await request(app).post('/auth/login')
    .set('Accept', 'application/json')
    .send({
      email: 'user1@example.com',
      password: 'Abc&1234'
    })
    .expect('Content-Type', /json/)
  
    const { body:bodyRes } = body
    token = bodyRes.token
    const activity = await Activity.findOne({ where: { name: 'Activity1'}})
    activityId = activity.id;
  })

  it('PUT STATUS: 200OK',async () => {
    const { body } = await request(app).put(`/activities/${activityId}`)
    .send(data)
    .set('Authorization', token)
    .set('Accept', 'text/html; charset=utf-8')
    .expect("Content-Type", /json/)
    .expect(200)
    const { code, status } = body
    expect(code).to.be.a('number')
    expect(code).to.equal(200)
    expect(status).to.be.true
  })
  
  it('PUT STATUS: 404 Activity not found',async () => {
    const { error } = await request(app).put(`/activities/8`)
    .send(data)
    .set('Authorization', token)
    .set('Accept', 'text/html; charset=utf-8')
    .expect('Content-Type', /text\/html/)
    .expect(404)
    const { status } = error
    expect(status).to.be.a('number')
    expect(status).to.equal(404)
  })
  
  it('PUT STATUS: 403 Error Updating a Activity',async () => {
    const { error } = await request(app).put(`/activities/${activityId}`)
    .send({
      cntent: 'activity updated',
      image: 'photo1.png'
    })
    .set('Authorization', token)
    .set('Accept', 'text/html; charset=utf-8')
    .expect('Content-Type', /json/)
    .expect(403)
    const { status, message } = error
    expect(status).to.be.a('number')
    expect(status).to.equal(403)
    expect(message).to.be.a('string')
  })
});