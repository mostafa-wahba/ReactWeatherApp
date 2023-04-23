import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import img1 from '../img/728093.png'
import img2 from '../img/83d3937e2c788df111969f1977f2f5c0.png'
import img3 from '../img/64px-Eo_circle_yellow_arrow-up.svg.png'
import img4 from '../img/64px-Eo_circle_yellow_arrow-down.svg.png'
import img5 from '../img/visibility.png'
import img6 from '../img/pngwing.com.png'

import axios from 'axios';
export default function TodayHighlights(props) {
    const {day,city}= props
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
    <>{isLoading ? (
      <p>Please Enter Your City Above </p>
    ) : forecast && forecast.current && forecast.location && forecast.forecast ? (
    <div className="container  h-100">
    <div className="row gy-2">
        <div className="col-4">
        <Card className='bg-white border-0 rounded-5'>
      <Card.Body className='d-flex flex-column'>
        <Card.Title>UV Index</Card.Title>
        <Card.Text className='display-1 text-center my-auto fw-bold'>
        {forecast.current.uv}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
        <div className="col-4">
        <Card className='Wind bg-white border-0 rounded-5'>
        <Card.Body className='d-flex flex-column'>
        <Card.Title>Wind Status</Card.Title>
        <Card.Img variant="top" src={img2}/>
        <Card.Text className='text-center'>
        {forecast.current.wind_kph} km/h
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
        <div className="col-4">
        <Card className='Sunrise bg-white border-0 rounded-5'>
        <Card.Body className='d-flex flex-column'>
        <Card.Title>Sunrise & Sunset</Card.Title>
        <Card.Text className='text-center my-auto'>
        <img src={img3} alt="" /> {forecast.forecast.forecastday[0].astro.sunrise}
        </Card.Text>
        <Card.Text className='text-center my-auto'>
        <img src={img4} alt="" /> {forecast.forecast.forecastday[0].astro.sunset}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
        <div className="col-4">
        <Card className='Humidity bg-white border-0 rounded-5'>
      <Card.Body className='d-flex flex-column'>
        <Card.Title>Humidity</Card.Title>
      <Card.Img variant="top" src={img1}/>
        <Card.Text className='text-center'>
        {forecast.current.humidity}%
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
        <div className="col-4">
        <Card className='Visibility bg-white border-0 rounded-5'>
      <Card.Body className='d-flex flex-column'>
        <Card.Title>Visibility</Card.Title>
      <Card.Img variant="top" src={img5}/>
        <Card.Text className='text-center'>
        {forecast.current.vis_km} km
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
        <div className="col-4">
        <Card className='Pressure bg-white border-0 rounded-5'>
      <Card.Body className='d-flex flex-column'>
        <Card.Title>Pressure</Card.Title>
      <Card.Img variant="top" src={img6}/>
        <Card.Text className='text-center'>
        {forecast.current.pressure_mb} mb
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
        </div>
    </div>
     ) : (
      <p>No forecast data available</p>
    )}
    </>
  )
}
