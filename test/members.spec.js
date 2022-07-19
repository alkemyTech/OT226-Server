const assert = require("assert");
const supertest = require("supertest");

const app = require("../app");

let token, idUser

before( async()=> {
  const {body } = await supertest(app).post('/auth/login')
      .set('Accept', 'application/json')
      .send({
          email: 'test2@email.com',
          password: '123231.pRng'
      })
      .expect('Content-Type', /json/)

  const { body:bodyRes } = body;
  token = bodyRes.token
  idUser = bodyRes.id
})
describe("[members] member path test", () => {

  
// console.log(token, idUser)
  /** Success Test Members --- Start */
  it("[/members - get] this route should fetch all members ", async () => {
    supertest(app)
      .get("/members")
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("[/members - post] this route creates a new member ", async () => {
    supertest(app)
      .post("/members")
      .send({
        name: "teste",
        image: "png.jpg",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("[/members/:id - delete this route delete member ", async () => {
    supertest(app)
      .delete("/members/6")
      .set(
        "authorization",
        token
      )
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("[/members/:id - upadate] this route upadate member ", async () => {
    supertest(app)
      .put("/members/10")
      .send({
        name: "test2e udateeeeeee",
        image: "png.jpg",
      })
      .set(
        "authorization",
        token
      )
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
  /** Success Test Members --- End */

  /** Errors Test Members --- Start */
  it("[/members - delete] unauthorized user ", async () => {
    supertest(app)
      .delete("/members/1")
      .set(
        "authorization",
        "eyJhbGciJIUzI1NsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZmlyc3ROYW1lIjoicmF1bCIsInJvbGVJZCI6MiwiaWF0IjoxNjU3ODIwMTAyLCJleHAiOjE2NTc4MjM3MDJ9.Cqm2ga--vuL9VfhQvCjIBDTWKiOMunaGPOGsl6kxN5w"
      )
      .expect(401)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("[/members - post] memebers path error missing data ", async () => {
    supertest(app)
      .post("/members/")
      .send({
        nam: "teste",
        image: "png.jpg",
      })
      .expect(403)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("[/members/:id - upadate] memebers path error missing data", async () => {
    supertest(app)
      .put("/members/5")
      .send({
        nme: "teste",
        imge: "png.jpg",
      })
      .set(
        "authorization",
        token
      )
      .expect(403)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("[/members/:id - delete] invalid ID ", async () => {
    supertest(app)
      .post("/members/999999")
      .set(
        "authorization",
        token
      )
      .expect(404)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
  /** Errors Test Members --- ENd */
});
