const request  = require('supertest');
const { expect  } = require('chai');

const app = require('../app')

describe('Test in users /users', () => { 
    it('[SUCCESS] should return a list of users', async()=> {
        const {body}= await request(app).get('/users')
                        .set('Accept', 'aplication/json')
                        .expect('Content-Type', /json/)
                        .expect(200);
        
        const { code, status, message, body: bodyRes } = body
                            
        expect(code).to.be.a('number');
        expect(code).to.equal(200);
        expect(status).to.be.a('boolean');
        expect(status).to.equal(true);
        expect(message).to.be.a('string');
        expect(message).to.equal('Users list retrieved successfully');
    })
 })