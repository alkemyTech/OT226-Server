const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');


describe('Test in Contacts /contacts', () => { 
    
    let token;

    const userContact = {
        name: 'Andres Rivera',
        email: 'andresrfelip@hotmail.com',
    }

    const badContact = {
        name: '',
        email: '',
    }

    before( async() => {
        const { body } = await request(app).post('/auth/login')
            .set('Accept', 'application/json')
            .send({
                email: 'gabi@alkemy.com',
                password: '123456aA*'
            })
            .expect('Content-Type', /json/)

        const { body:bodyRes} = body;
        token = bodyRes.token;
    })

    describe('POST /contacts', () => { 

        it('POST [SUCCESS] should return a response 200', async() => {
            
            const { body } = await request(app).post('/contacts')
                                .set('Accept', 'application/json')
                                .send( userContact )
                                .expect('Content-Type', /json/) 
    
            const { code, status, message, body: bodyRes } = body;
    
            expect(code).to.be.a('number');
            expect(code).to.equal(200);
            expect(status).to.be.a('boolean');
            expect(status).to.equal(true);
            expect(message).to.be.a('string');
            expect(message).to.equal('Contact created successfully');
        })

        it('POST [ERROR] should return a response 403', async() => {
            
            const { error } = await request(app).post('/contacts')
                                .set('Accept', 'application/json')
                                .send( badContact )
                                .expect('Content-Type', /json/) 
    
            const { status } = error;
            expect(status).to.be.a('number');
            expect(status).to.equal(403);

        })

        describe('GET /contacts', () => { 
           it('GET [SUCCESS] should return a list of contacts', async ()=>{
   
               const { body } = await request(app).get('/contacts')
                                   .set('Accept', 'application/json')
                                   .set('Authorization', token )
                                   .expect('Content-Type', /json/) 
       
               const { code, status, message, body: bodyRes } = body;
       
               expect(code).to.be.a('number');
               expect(code).to.equal(200);
               expect(status).to.be.a('boolean');
               expect(status).to.equal(true);
               expect(message).to.be.a('string');
               expect(message).to.equal('Contacts retrieved successfully');
               expect(bodyRes).to.be.a('array')
           })
   
           it('GET [ERROR] - Request without Token, should return an unauthorized error', async() => {
   
               const { error } = await request(app).get('/contacts')
                                   .set('Accept', 'application/json')
                                   .expect('Content-Type', /json/) 
       
               const { status, text } = error;
               expect(status).to.be.a('number');
               expect(status).to.equal(401);
               expect(text).to.contains('Token not provided');
           })
       })
     })
 })