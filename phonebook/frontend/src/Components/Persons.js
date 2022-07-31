import personService from "../services/person";

const Persons = ({ persons, filter, setPersons, setMessage }) => {
  const onDelete = (id) => {
    let p = persons.find((person) => person.id === id);
    let toDelete = window.confirm(`Delete ${p.name}?`);
    if (toDelete) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setMessage({
            isError: false,
            message: "Contact has been deleted successfully",
          });
        })
        .catch((err) => {
          setMessage({
            isError: true,
            message: "Person has already been deleted",
          });
        });
    }
  };
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().startsWith(filter.toLowerCase())
        )
        .map((person) => (
          <li key={person.id}>
            {person.name} : {person.number}{" "}
            <button
              onClick={() => {
                onDelete(person.id);
              }}
            >
              delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export default Persons;
