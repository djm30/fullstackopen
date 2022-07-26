import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  const getContent = () => {
    if (countries.length === 0) return "No results!";
    if (countries.length > 10) return "Too many, please filter it down";
    if (countries.length === 1)
      return (
        <Country country={countries[0]} key={countries[0].cca2} single={true} />
      );
    else
      return countries.map((country) => (
        <Country key={country.cca2} country={country} />
      ));
  };

  let content = getContent();
  return <>{content}</>;
};

export default Countries;
