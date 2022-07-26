const Filter = ({ filter, setFilter }) => {
  return <input value={filter} onChange={(e) => setFilter(e.target.value)} />;
};

export default Filter;
