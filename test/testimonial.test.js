const assert = require("assert");
const supertest = require("supertest");

const app = require("../app");

let token, idUser, id;

before(async () => {
  const { body } = await supertest(app)
    .post("/auth/login")
    .set("Accept", "application/json")
    .send({
      password: "123231.pRng",
      email: "test2@email.com",
    })
    .expect("Content-Type", /json/);

  const { body: bodyRes } = body;
  token = bodyRes.token;
  idUser = bodyRes.id;
});
before(async () => {
  const { body } = await supertest(app)
    .post("/testimonials")
    .set("authorization", token)
    .send({
      name: "provando test finciona",
      image: "IMG.JSA",
      content: "FAJLFJALJKD",
    })
    .expect("Content-Type", /json/);

  const { body: bodyRes } = body;
  id = bodyRes.id;
});
describe("[testimonials] member path test", () => {
  // console.log(token, idUser)
  /** Success Test testimonials --- Start */
  it("[/testimonials - get] this route should fetch all testimonials", async () => {
    supertest(app)
      .get("/testimonials")
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("[/testimonials - post] this route creates a new testimonials ", async () => {
    supertest(app)
      .post("/testimonials")
      .send({
        name: "provando test finciona",
        image: "IMG.JSA",
        content: "FAJLFJALJKD",
      })
      .set("authorization", token)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("[/testimonials/:id - delete this route delete testimonials ", async () => {
    supertest(app)
      .delete(`/testimonials/${id}`)
      .set("authorization", token)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("[/testimonials/:id - upadate] this route upadate testimonials ", async () => {
    supertest(app)
      .put("/testimonials/10")
      .send({
        name: "provando test finciona",
        image: "IMG.JSA",
        content: "FAJLFJALJKD",
      })
      .set("authorization", token)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
  /** Success Test testimonials --- End */

  /** Errors Test testimonials --- Start */
  it("[/testimonials - delete] unauthorized user ", async () => {
    supertest(app)
      .delete("/testimonials/1")
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
  it("[/testimonials - delete] Testimonial not found", async () => {
    supertest(app)
      .delete("/testimonials/0")
      .set("authorization", token)
      .expect(404)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
  it("[/testimonials - post] Unauthorized user", async () => {
    supertest(app)
      .post("/testimonials/0")
      .set(
        "authorization",
        "eyJhbGciJIUzI1NsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZmlyc3ROYW1lIjoicmF1bCIsInJvbGVJZCI6MiwiaWF0IjoxNjU3ODIwMTAyLCJleHAiOjE2NTc4MjM3MDJ9.Cqm2ga--vuL9VfhQvCjIBDTWKiOMunaGPOGsl6kxN5w"
      )
      .expect(401)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  /** Errors Test testimonials --- ENd */
});
