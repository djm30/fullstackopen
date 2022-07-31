import { useState } from "react";
import personService from "../services/person";

const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const isAlreadyPerson = persons.reduce((prev, curr) => {
    if (curr.name.toLowerCase() === newName.toLowerCase()) {
      prev = true;
    }
    return prev;
  }, false);

  const clearFieldsAndUpdateMessage = (message) => {
    setNewName("");
    setNewNumber("");
    setMessage({ isError: false, message });
  };

  const errorHandlerWrapper = (func) => {
    let errorMessage;
    func().catch((error) => {
      errorMessage = error.response.data.error;
      setMessage({ isError: true, message: errorMessage });
    });
  };

  const updatePerson = () => {
    const update = () => {
      let person = persons.find(
        (p) => p.name.toLowerCase() === newName.toLowerCase()
      );
      return personService
        .update(person.id, { ...person, number: newNumber })
        .then((person) => {
          setPersons([...persons.filter((p) => p.id !== person.id), person]);
          clearFieldsAndUpdateMessage("Updated person");
        });
    };
    errorHandlerWrapper(update, "Person updated");
  };

  const addPerson = () => {
    const add = () => {
      return personService
        .create({ name: newName, number: newNumber })
        .then((person) => {
          setPersons((persons) => [...persons, person]);
          clearFieldsAndUpdateMessage("Person added");
        });
    };
    errorHandlerWrapper(add, "Person added");
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (isAlreadyPerson) {
      let updateNumber = window.confirm(
        `${newName} is already added to the phonebook, would you like to replace the old number with a new one?`
      );
      if (updateNumber) {
        updatePerson();
      }
    } else {
      addPerson();
    }
  };

  const onNameChange = (event) => {
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
