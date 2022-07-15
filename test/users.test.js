const request  = require('supertest');
const { expect  } = require('chai');

const app = require('../app')

let token, idUser;

describe('Test in users /users', () => { 
    const putUser = {
        firstName: 'Gabi Edit',
        lastName: 'Corti',
        password: '123456aA*',
        email: 'gabi@alkemy.com',
    }

    before( async()=> {
        const {body } = await request(app).post('/auth/login')
            .set('Accept', 'application/json')
            .send({
                email: 'gabi@alkemy.com',
                password: '123456aA*'
            })
            .expect('Content-Type', /json/)

        const { body:bodyRes } = body;
        token = bodyRes.token
        idUser = bodyRes.id
    })
    describe('GET /users', () => { 
        it('GET [SUCCESS] should return a list of users', async()=> {
            const {body}= await request(app).get('/users')
                            .set('Accept', 'aplication/json')
                            .expect('Content-Type', /json/)
            
            const { code, status, message, body: bodyRes } = body
                                
            expect(code).to.be.a('number');
            expect(code).to.equal(200);
            expect(status).to.be.a('boolean');
            expect(status).to.equal(true);
            expect(message).to.be.a('string');
            expect(message).to.equal('Users list retrieved successfully');
            expect(bodyRes).to.be.a('array');
    
        })        
     })
    describe('PUT /users/:id', () => { 
        it('PUT [ERROR] should return an error about id doesn\'t exist', async()=> {

            const {error}= await request(app).put(`/users/7000`)
                            .send(putUser)
                            .set('Accept', 'text/html; charset=utf-8')
                            .expect('Content-Type', /text\/html/)
            
            const { status, text } = error
                                
            expect(status).to.be.a('number');
            expect(status).to.equal(404);
            expect(text).to.be.a('string');
            expect(text).to.contain('NotFoundError')
            expect(text).to.contain('User not found')    
        })   

        it('PUT [SUCCESS] should return an update user', async()=> {

            const {body}= await request(app).put(`/users/${idUser}`)
                            .send(putUser)
                            .set('Accept', 'aplication/json')
                            .expect('Content-Type', /json/)
            
            const { code, status, message, body: bodyRes } = body
                
            expect(code).to.be.a('number');
            expect(code).to.equal(200);
            expect(status).to.be.a('boolean');
            expect(status).to.equal(true);
            expect(message).to.be.a('string');
            expect(message).to.equal('User updated successfully');
            expect(bodyRes).to.be.a('array'); 
        })        
     })
 })