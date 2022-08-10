import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: "10px" }}>
      <label htmlFor="filter">Filter:</label>
      <input
        name="filter"
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
    </div>
  );
};

export default Filter;
