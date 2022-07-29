import { useState } from "react";
import personService from "../services/person";

const PersonForm = ({ persons, setPersons, setMessage }) => {
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
      let updateNumber = window.confirm(
        `${newName} is already added to the phonebook, would you like to replace the old number with a new one?`
      );
      if (updateNumber) {
        let person = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase()
        );
        personService
          .update(person.id, { ...person, number: newNumber })
          .then((person) => {
            setPersons([...persons.filter((p) => p.id !== person.id), person]);
          });
        setNewName("");
        setNewNumber("");
        setMessage({ isError: false, message: "Phone Number Updated" });
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((person) => {
          setPersons((persons) => [...persons, person]);
        });
      setNewName("");
      setNewNumber("");
      setMessage({ isError: false, message: "Contact has been added" });
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
