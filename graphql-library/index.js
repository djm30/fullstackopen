const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

const MONGODB_URI =
  "mongodb+srv://djm:dagoznfZbwQUocDh@mongo.mqptf.mongodb.net/noteApp?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

// let authors = [
//   {
//     name: "Robert Martin",
//     born: 1952,
//   },
//   {
//     name: "Martin Fowler",
//     born: 1963,
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     born: 1821,
//   },
//   {
//     name: "Joshua Kerievsky", // birthyear not known
//   },
//   {
//     name: "Sandi Metz", // birthyear not known
//   },
// ];

// /*
//  * Suomi:
//  * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
//  * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
//  *
//  * English:
//  * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
//  * However, for simplicity, we will store the author's name in connection with the book
//  */

// let books = [
//   {
//     title: "Clean Code",
//     published: 2008,
//     author: "Robert Martin",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Agile software development",
//     published: 2002,
//     author: "Robert Martin",
//     genres: ["agile", "patterns", "design"],
//   },
//   {
//     title: "Refactoring, edition 2",
//     published: 2018,
//     author: "Martin Fowler",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Refactoring to patterns",
//     published: 2008,
//     author: "Joshua Kerievsky",
//     genres: ["refactoring", "patterns"],
//   },
//   {
//     title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//     published: 2012,
//     author: "Sandi Metz",
//     genres: ["refactoring", "design"],
//   },
//   {
//     title: "Crime and punishment",
//     published: 1866,
//     author: "Fyodor Dostoevsky",
//     genres: ["classic", "crime"],
//   },
//   {
//     title: "The Demon ",
//     published: 1872,
//     author: "Fyodor Dostoevsky",
//     genres: ["classic", "revolution"],
//   },
// ];

// authors.forEach((author) => new Author({ ...author }).save());
// books.forEach(async (book) => {
//   const author = await Author.findOne({ name: book.author });
//   new Book({
//     ...book,
//     author: author.id,
//   }).save();
// });

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const findAuthor = (name) => Author.findOne({ name });

const resolvers = {
  Query: {
    bookCount: async (root, args) => Book.count(),
    authorCount: async (root, args) => Author.count(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({});
      }
      let query = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        query = { ...query, ...{ author: author.id } };
      }
      if (args.genre) {
        query = { ...query, ...{ genres: args.genre } };
      }
      console.log(query);
      return Book.find(query);
    },
    allAuthors: async (root, args) => Author.find({}),
    me: (root, args, { currentUser }) => currentUser,
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return Book.find({ author: author.id }).count();
    },
  },
  Book: {
    author: async (root) => {
      return Author.findById(root.author);
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await findAuthor(args.author);
      if (!author) {
        try {
          console.log(args);
          console.log(args.author.length < 4);
          author = await new Author({ name: args.author }).save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      try {
        return new Book({ ...args, author }).save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args) => {
      const author = await findAuthor(args.name);
      console.log(author);
      if (!author) return null;
      author.born = args.setBornTo;
      await author.save();
      console.log(author);
      return author;
    },
    createUser: async (root, args) => {
      try {
        const user = new User({ ...args }).save();
        return user;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username: username });
      console.log(user);
      console.log(password);
      if (!user || password !== "password") {
        throw new AuthenticationError();
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
