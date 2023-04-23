import React, { useState } from "react";
import Search from "./Search/Search";
import Forecast from "./Forecast/Forecast";
import ForecastDetails from "./ForecastDetails/ForecastDetails";

export default function App() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (city, country) => {
    setCity(city);
    setCountry(country);
    setSearchTerm(`${city}, ${country}`);
    // Perform search with the city and country values
  };
  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday ",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();

  return <>
  <div className="container px-5">
  <div className="row">
  <div className="col-3">
  <Search handleSearch={handleSearch}/>
  <ForecastDetails city={city} country={country} date={date} dayList={dayList} />
  </div>
<div className="col-9 bg-light">
  <Forecast city={city} country={country} date={date} dayList={dayList}/>
  </div>
  </div>
  </div>
      </>;
}
