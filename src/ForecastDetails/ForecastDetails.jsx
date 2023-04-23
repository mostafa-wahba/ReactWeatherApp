import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../img/toppng.com-rain-cloud-shape-with-a-few-raindrops-icon-cartoon-water-drops-449x738.png';

export default function ForecastDetails(props) {
  const { date, dayList, city, country } = props;
  let day = dayList[date.getDay()];
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getForecastCity() {
    try {
      let data = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=ff8047402ac341ac83f142541231802&q=${city}`
      );
      setForecast(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (city) {
      setIsLoading(true);
      getForecastCity();
    }
  }, [city]);

  return (
    <>
      {isLoading ? (
        <p>Please Enter Your City Above </p>
      ) : forecast && forecast.current && forecast.location ? (
        <div className="container">
          <div className="row">
            <h2 className="location">{forecast.location.name}</h2>
            <div className="icon">
              <img src={forecast.current.condition.icon} alt="" />
            </div>
            <div className="temp display-1 fw-normal">{forecast.current.temp_c}<sup>℃</sup></div>
            <div className="The-day">{day}</div>
            <div className="temp-details mt-5">
              <div className="detail d-flex justify-content-start align-items-center">
                <img src={forecast.current.condition.icon} alt="" />
                <p className="m-0 ms-2">{forecast.current.condition.text}</p>
              </div>
              <div className="details d-flex justify-content-start align-items-center">
                <img src={img} alt="" />
                <p className="m-0 ms-2">{forecast.forecast.forecastday[0].day.daily_chance_of_rain}% chance of rain</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No forecast data available</p>
      )}
    </>
  );
}