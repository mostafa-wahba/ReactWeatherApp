import React, { useEffect, useState } from 'react'
import Weekdays from '../Weekdays/Weekdays';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TodayHighlights from '../TodayHighlights/TodayHighlights';
import axios from 'axios';

export default function (props) {
    const{date , dayList,city }= props;
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
    <div className="container py-4 bg-light">
    <Tabs
      defaultActiveKey="today"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab className='h-100' eventKey="today" title="Today">
      <TodayHighlights city={city} date={date} dayList={dayList}/>
      </Tab>
      <Tab eventKey="3Days" title="3Days">
      <Weekdays city={city} date={date} dayList={dayList}/>
      </Tab>
    </Tabs>
    
    </div>
    </>
  )
}
