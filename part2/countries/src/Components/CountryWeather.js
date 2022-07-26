import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryWeather = ({ countryName, lat, lng }) => {
  const api_key = process.env.REACT_APP_WEATHER_KEY;
  const [weather, setWeather] = useState({
    current: {
      temp_c: 1,
      wind_mph: 1,
      condition: {
        icon: "#",
        text: "sunny",
      },
    },
  });

  const fetchWeather = (latlng) => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${lat},${lng}&aqi=no`
      )
      .then((response) => {
        console.log(response);
        setWeather(response.data);
      });
  };

  useEffect(fetchWeather, [api_key, lat, lng]);

  return (
    <>
      <h3>Weather in {countryName}:</h3>
      <p>Temperature: {weather.current.temp_c}&#8451;</p>
      <img
        src={weather.current.condition.icon}
        alt={`${weather.current.condition.text} weather`}
      />
      <p>Windspeed: {weather.current.wind_mph} M/ph</p>
    </>
  );
};

export default CountryWeather;
