import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Components/Countries";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const callApi = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  };

  const filterCountries = () => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
      )
    );
  };

  useEffect(callApi, []);
  useEffect(filterCountries, [searchTerm, countries]);
  return (
    <>
      <h2>Countries</h2>
      <h3>Enter a country:</h3>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h2>Results:</h2>
      <Countries countries={filteredCountries} />
    </>
  );
};

export default App;
