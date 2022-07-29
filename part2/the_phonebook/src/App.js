import { useState, useEffect } from "react";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import personService from "./services/person";
import DisplayMessage from "./Components/DisplayMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState();

  useEffect(() => {
    personService.get().then((persons) => setPersons(persons));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <DisplayMessage
        setMessage={setMessage}
        messageInfo={message}
        timeToDisplay={4000}
      />
      <h2>Filter results</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new contact</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
