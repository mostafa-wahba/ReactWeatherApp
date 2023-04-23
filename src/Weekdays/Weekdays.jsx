import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import img3 from '../img/176.png'
import axios from 'axios';
export default function Weekdays(props) {
    const{date , dayList,city}= props;
    const todayIndex = date.getDay(); // get the index of the current day
    const [forecast, setForecast] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    async function getForecastWeek() {
      try {
        let data = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=ff8047402ac341ac83f142541231802&q=${city}=07112&days=7`
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
        getForecastWeek();
      }
    }, [city]);
  return (
    <>{isLoading ? (
      <p>Please Enter Your City Above </p>
    ) : forecast && forecast.current && forecast.location && forecast.forecast ? (
      <div className="container">
        <div className="row gy-2">
          {forecast.forecast.forecastday.slice(0, 7).map((day, index) => (
            <div className="col-4" key={index}>
              <Card className="bg-white border-0 rounded-2">
              <Card.Body className='d-flex flex-column'>
                  <Card.Title className="text-center">
                    {dayList[(index + todayIndex+1) % 7]}
                  </Card.Title>
                  <Card.Img variant="top" src={img3} />
                  <Card.Text className="week-temp text-center">
                    {day.day.maxtemp_c}<sup>℃</sup><span>{day.day.mintemp_c}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p>No forecast data available</p>
    )}
    </>
  )
}
