const request = require("supertest");
const expect = require("chai").expect;
const app = require("../src/app"); // pastikan path sesuai

describe("API Testing", () => {
  it("should return all items", (done) => {
    request(app)
      .get("/api/items")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });

  it("should create a new item", (done) => {
    const newItem = { name: "Item 3" };
    request(app)
      .post("/api/items")
      .send(newItem)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("name", "Item 3");
        done();
      });
  });

  it("should delete an item by id", (done) => {
    request(app)
      .delete("/api/items/1") // pastikan id sesuai dengan item yang ada
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("should update an item by id", (done) => {
    const updatedItem = { name: "Updated Item Name" };
    request(app)
      .put("/api/items/2") // pastikan id sesuai dengan item yang ada
      .send(updatedItem)
      .end((err, res) => {
        expect(res.status).to.equal(200); // Mengharapkan status 200
        expect(res.body).to.have.property("name", "Updated Item Name");
        done();
      });
  });
});
