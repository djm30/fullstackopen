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

export default Persons;
