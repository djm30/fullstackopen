import React, { useState } from "react";
import CountryWeather from "./CountryWeather";

const Country = ({ country, single }) => {
  const [show, setShow] = useState(false);

  if (single) {
    if (!show) {
      setShow(true);
    }
  }

  const getContent = () => {
    if (show) {
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital:{country.capital}</p>
          <p>Area: {country.area}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`${country.name.common}-flag`} />
          {single ? (
            <CountryWeather
              countryName={country.name.common}
              lat={country.latlng[0]}
              lng={country.latlng[1]}
            />
          ) : (
            ""
          )}
          {single ? (
            ""
          ) : (
            <div>
              <button onClick={() => setShow(!show)}>Hide</button>
            </div>
          )}
        </div>
      );
    }
    return (
      <div>
        <span>{country.name.common}</span>
        {single ? "" : <button onClick={() => setShow(!show)}>Show</button>}
      </div>
    );
  };

  let content = getContent();

  return <>{content}</>;
};

export default Country;
