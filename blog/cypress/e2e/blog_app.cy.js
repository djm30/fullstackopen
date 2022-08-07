Cypress.Commands.add("createUser", ({ username, name, password }) => {
  cy.request("POST", "http://localhost:3003/api/users", {
    username,
    name,
    password,
  });
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("user", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createBlog", ({ title, url, author, likes }) => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: { title, url, author, likes },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });
});

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login");
  });

  it("Login with correct credentials", function () {
    cy.createUser({ username: "djm30", name: "dym30", password: "password" });
    cy.get("#username").type("djm30");
    cy.get("#password").type("password");
    cy.get("#login-submit").click();

    cy.get(".message")
      .should("contain", "Login Successful!")
      .and("have.css", "border-color", "rgb(148, 228, 27)")
      .and("have.css", "background-color", "rgb(67, 102, 15)");
  });

  it("Login with incorrect credentials fails", function () {
    cy.createUser({ username: "djm30", name: "dym30", password: "password" });

    cy.get("#username").type("djm30");
    cy.get("#password").type("wrongpassword");
    cy.get("#login-submit").click();

    cy.get(".message")
      .should("contain", "Login Failed!")
      .and("have.css", "border-color", "rgb(225, 45, 5)")
      .and("have.css", "background-color", "rgba(206, 34, 34, 0.725)");
  });

  describe("Once logged in...", function () {
    beforeEach(function () {
      cy.createUser({ username: "djm30", name: "dym30", password: "password" });
      cy.login({ username: "djm30", password: "password" });
    });

    it("Should show a button to open the blog form", function () {
      cy.contains("Add a blog");
    });

    it("Should show blog form when add a blog form is clicked", function () {
      cy.contains("Add a blog").click();

      cy.contains("Title");
      cy.contains("Author");
      cy.contains("Url");

      cy.get("#blog-submit");
      cy.contains("Cancel");
    });

    it("Should create a new blog", function () {
      cy.contains("Add a blog").click();

      cy.get("#title").type("Blog title");
      cy.get("#author").type("Blog author");
      cy.get("#url").type("Blog url");

      cy.get("#blog-submit").click();

      cy.contains("Blog title");
      cy.contains("Blog author");
    });

    describe("Once a blog is created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Blog Title",
          author: "Blog Author",
          url: "Blog Url",
          likes: 0,
        });
        cy.visit("http://localhost:3000");
      });

      it("Should show full details once the blog show full has been pressed", function () {
        cy.contains("Show Full").click();

        cy.contains("Likes: 0");
        cy.contains("URL:");
        cy.contains("Delete Post");
      });

      it("Should increase the likes upon hitting the like button", function () {
        cy.contains("Show Full").click();

        cy.contains("Likes: 0");

        cy.get("#like-button").click();
        cy.contains("Likes: 1");
      });

      it("A blog should be deleted when the user who created it should delete", function () {
        cy.contains("Show Full").click();

        cy.get("#delete-button").click();

        cy.should("not.contain", "Blog Title");
        cy.should("not.contain", "Blog Author");
        cy.should("not.contain", "Blog Url");

        cy.get(".message")
          .should("contain", "Blog Deleted!")
          .and("have.css", "border-color", "rgb(148, 228, 27)")
          .and("have.css", "background-color", "rgb(67, 102, 15)");
      });

      it("A blog should not be deleted by the user who didn't create it", function () {
        cy.createUser({
          username: "djm31",
          name: "not authorized",
          password: "password",
        });
        cy.login({ username: "djm31", password: "password" });

        cy.contains("Show Full").click();

        cy.get("#delete-button").click();

        cy.get(".message")
          .should(
            "contain",
            "Error deleting blog: Request failed with status code 401",
          )
          .and("have.css", "border-color", "rgb(225, 45, 5)")
          .and("have.css", "background-color", "rgba(206, 34, 34, 0.725)");
      });

      describe("When mutliple blogs are created", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "Blog Title2",
            author: "Blog Author2",
            url: "Blog Url2",
            likes: 22,
          });
          cy.createBlog({
            title: "Blog Title3",
            author: "Blog Author3",
            url: "Blog Url3",
            likes: 3,
          });
          cy.visit("http://localhost:3000");
        });
        it("Should list them in order of their likes", function () {
          cy.contains("Blog Title");

          cy.get(".blogs").children().eq(0).should("contain", "Blog Title2");
          cy.get(".blogs").children().eq(1).should("contain", "Blog Title3");
          cy.get(".blogs").children().eq(2).should("contain", "Blog Title");
        });
      });
    });
  });
});
