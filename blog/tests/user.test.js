const User = require("../models/user");
const app = require("../app");
const helper = require("./test_helper");
const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let api = supertest(app);

describe("testing adding the user", () => {
  beforeEach(async () => {
    await helper.removeUsersFromDb();
    await helper.addUsersToDb();
  });

  test("valid user should be added to the database", async () => {
    const user = {
      username: "djm30",
      password: "password",
      name: "dylan morrison",
    };

    const initialUsers = await helper.getUsersFromDb();

    const response = await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const afterUsers = await helper.getUsersFromDb();
    expect(afterUsers.length).toBe(initialUsers.length + 1);
  });

  test("user with username shorter than 3 characters should not be added", async () => {
    const user = {
      username: "d",
      password: "password",
      name: "dylan morrison",
    };

    const initialUsers = await helper.getUsersFromDb();

    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const afterUsers = await helper.getUsersFromDb();

    expect(afterUsers.length).toBe(initialUsers.length);
  });

  test("user with password shorter than 3 characters should not be added", async () => {
    const user = {
      username: "djm",
      password: "pa",
      name: "dylan morrison",
    };

    const initialUsers = await helper.getUsersFromDb();

    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const afterUsers = await helper.getUsersFromDb();

    expect(afterUsers.length).toBe(initialUsers.length);
  });
});

describe("testing logging in the user", () => {});
