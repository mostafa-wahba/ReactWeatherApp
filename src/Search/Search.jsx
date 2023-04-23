import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Search(props) {
  const { handleSearch } = props;
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
    handleSearch(e.target.value, country);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    handleSearch(city, e.target.value);
  };

  return (
    <>
      <div className="container py-4">
        <div className="row align-align-items-center gx-0 gy-2">
          <label className="col-1 pt-1" role="button" htmlFor="city">
            <FontAwesomeIcon className="me-2" icon={faMagnifyingGlass} />
          </label>
          <input
            className="col-11 rounded-pill py-1 ps-3 border-0 bg-light"
            type="text"
            id="city"
            placeholder="Search for City ..."
            value={city}
            onChange={handleCityChange}
            onKeyUp={handleCityChange}
          />
        </div>
      </div>
    </>
  );
}