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

export default PersonForm;
