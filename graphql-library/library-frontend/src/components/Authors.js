import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_BIRTH_YEAR } from "../queries";

const Authors = (props) => {
  const [birth, setBirth] = useState(0);
  const [author, setAuthor] = useState();

  const result = useQuery(ALL_AUTHORS, {
    onError: (error) => console.log(error),
  });

  const [editBirthYear, response] = useMutation(UPDATE_BIRTH_YEAR);
  console.log(response);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  const onSubmit = (e) => {
    e.preventDefault();

    editBirthYear({ variables: { name: author, setBornTo: Number(birth) } });

    setBirth(0);
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Update author birth year</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Author Name</label>
          <select name="name" onChange={(e) => setAuthor(e.target.value)}>
            {authors.map((a, index) => {
              return (
                <option key={index} value={a.name}>
                  {a.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="year">Birth Year</label>
          <input
            name="year"
            type="number"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default Authors;
