const mongoose = require("mongoose");

const [password, name, number] = process.argv.slice(2);

if (!password) {
  console.log("Please enter the database password ");
  process.exit(0);
}

// dagoznfZbwQUocDh

mongoose
  .connect(
    `mongodb+srv://djm:${password}@mongo.mqptf.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error connecting to database: ", err));

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const fetchAll = () => {
  Person.find({})
    .then((response) => console.log(response))
    .catch(() => console.log("Error fetching people from the database"))
    .finally(() =>
      mongoose.disconnect().then(console.log("Database disconnected"))
    );
};

const addUser = () => {
  if (name && number) {
    const personToAdd = new Person({
      name,
      number,
    });
    personToAdd
      .save()
      .then(() => console.log("Person has been saved to database"))
      .catch("Error when trying to save person to the database")
      .finally(() =>
        mongoose.disconnect().then(console.log("Database disconnected"))
      );
  } else {
    console.log("Please provide both a name and a number");
  }
};

if (!name && !number) fetchAll();
else addUser();
