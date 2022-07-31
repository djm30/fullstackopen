const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

require("dotenv").config();

const app = express();

app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms body - :body"
  )
);

app.use(express.static("build"));
app.use(cors());

const url = process.env.MONGO_URI;

mongoose
  .connect(url)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error connecting to database: ", err));

// Example Middleware function

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

// app.use(requestLogger);

const getId = () => {
  return Math.max(...persons.map((note) => note.id)) + 1;
};

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else res.status(404).end();
    })
    .catch((error) => next(error));
});

app.get("/api/info", (req, res) => {
  let length = -1;
  Person.find({}).then((response) => {
    length = response.length;
  });
  res.send(
    `<p>Phonebook has info for ${length} people</p><p>${new Date()}</p>`
  );
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res
      .status(400)
      .json({ error: "Please ensure name and number have been filled in" });
  }
  Person.findOne({ name }).then((person) => {
    if (person) {
      return res
        .status(400)
        .json({ error: "Person with name already exists in the database" });
    }
  });
  new Person({ name, number })
    .save()
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res
      .status(400)
      .json({ error: "Please ensure name and number have been filled in" });
  }
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true }
  )
    .then((user) => res.json(user))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
};

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => console.log(`App listening on port ${port}!`));
