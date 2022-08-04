const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const supertest = require("supertest");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");

beforeEach(async () => {
  await helper.removeBlogsFromDb();
  await helper.addBlogsToDb();
  await helper.removeUsersFromDb();
  await helper.addUsersToDb();
});

const baseUrl = "/api/blogs";

const api = supertest(app);

describe("retrieving blogs from the databse", () => {
  test("GET / -> returns a list of notes", async () => {
    const blogs = await helper.getBlogs();
    const response = await api
      .get(baseUrl)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const body = response.body;

    expect(body[0].id).toBeDefined();
    expect(body.length).toEqual(blogs.length);
    expect(body.map((b) => b.title)).toContain("React patterns");
  });
});

describe("creating blogs in the database", () => {
  test("POST / -> creates a new post", async () => {
    const initialBlogs = await helper.getBlogs();

    const newBlog = {
      title: "React anti-paterns",
      author: "Mr Jason Firebase",
      url: "https://fireship.io",
      likes: 7,
    };

    const token = await helper.loginAndGetToken(api);

    const response = await api
      .post(baseUrl)
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const body = response.body;

    expect(body.id).toBeDefined();
    expect(body.title).toBe(newBlog.title);
    expect(body.author).toBe(newBlog.author);
    expect(body.url).toBe(newBlog.url);
    expect(body.likes).toBe(newBlog.likes);

    const afterBlogs = await helper.getBlogs();
    expect(afterBlogs.length).toBe(initialBlogs.length + 1);

    const blogInDb = await helper.getBlog(body.id);
    expect(blogInDb.title).toBe(newBlog.title);
    expect(blogInDb.author).toBe(newBlog.author);
    expect(blogInDb.url).toBe(newBlog.url);
    expect(blogInDb.likes).toBe(newBlog.likes);
  });

  test("POST / -> if likes is undefined, defaulted to 0", async () => {
    const newBlog = {
      title: "React anti-paterns",
      author: "Mr Jason Firebase",
      url: "https://fireship.io",
    };

    const token = await helper.loginAndGetToken(api);

    const response = await api
      .post(baseUrl)
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const blogInDb = await helper.getBlog(response.body.id);
    expect(blogInDb.likes).toBe(0);
  });

  test("POST / -> if empty title and url, badrequest is returned", async () => {
    const newBlog = {
      author: "Mr Jason Firebase",
    };

    const token = await helper.loginAndGetToken(api);

    const response = await api
      .post(baseUrl)
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
    console.log(response.body.error);
  });
});

describe("updating blogs in the databse", () => {
  test("PUT /id -> Delete a valid blog", async () => {
    const initialBlogs = await helper.getBlogs();
    const blogToUpdate = initialBlogs[0];

    const updatedBlog = {
      title: blogToUpdate.title,
      author: "Dj Dilly D",
      url: blogToUpdate.url,
      likes: 28,
    };

    const response = await api
      .put(`${baseUrl}/${blogToUpdate._id}`)
      .send(updatedBlog)
      .expect(200);

    expect(response.body.id).toBeDefined();
    const blogFromDb = await helper.getBlog(blogToUpdate.id);
    expect(blogFromDb.title).toBe(blogToUpdate.title);
    expect(blogFromDb.author).toBe("Dj Dilly D");
    expect(blogFromDb.url).toBe(blogToUpdate.url);
    expect(blogFromDb.likes).toBe(28);
  });
});

describe("deleting blogs in the database", () => {
  test("DELETE /id -> Delete a valid blog with a valid user", async () => {
    const { user: userResponse, token } = await helper.getUserAndToken(api);

    const blogToDelete = await new Blog({
      title: "test",
      url: "test",
      user: userResponse.id.toString(),
    }).save();

    const user = await User.findById(userResponse.id);
    user.blogs.push(blogToDelete.id.toString());
    await user.save();

    const initialBlogs = await helper.getBlogs();

    const response = await api
      .delete(`${baseUrl}/${blogToDelete._id.toString()}`)
      .set("authorization", `Bearer ${token}`)
      .expect(204);

    const afterBlogs = await helper.getBlogs();
    expect(afterBlogs.length).toBe(initialBlogs.length - 1);
  });
});

describe("/api/blogs", () => {});

afterAll(() => {
  mongoose.connection.close();
});
