import { useState } from "react";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    const isAlreadyPerson = persons.reduce((prev, curr) => {
      if (curr.name.toLowerCase() === newName.toLowerCase()) {
        prev = true;
      }
      return prev;
    }, false);
    if (isAlreadyPerson) {
      alert(
        `The Person with the name: ${newName}, has already been added to the phonebook`
      );
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        })
      );
      setNewName("");
      setNewNumber("");
    }
  };
  const onNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filter }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().startsWith(filter.toLowerCase())
        )
        .map((person) => (
          <li key={person.id}>
            {person.name} : {person.number}
          </li>
        ))}
    </ul>
  );
};

const Filter = ({ filter, setFilter }) => {
  return <input value={filter} onChange={(e) => setFilter(e.target.value)} />;
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [filter, setFilter] = useState("");

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Filter results</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new contact</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
