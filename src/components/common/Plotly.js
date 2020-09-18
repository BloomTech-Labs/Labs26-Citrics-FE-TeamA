import React, { useEffect, useState, useContext } from 'react';
import Plot from 'react-plotly.js';
import {
  reportRentData,
  reportWeatherData,
  reportWalkData,
} from '../../api/reportData';
import { ReportContext } from '../../state/contexts/ReportContext';

import { Popover, Button } from 'antd';

export default function Plotly() {
  //  State for plotly json info
  const [thisCityData, setThisCityData] = useState([]);
  const [walkCityData, setwalkCityData] = useState([]);
  const [weatherCityData, setweatherCityData] = useState([]);
  let { compareList } = useContext(ReportContext);
  let walk = (
    <div>
      <p>
        {walkCityData.city} Score: {walkCityData.walkability}
      </p>
      <p>How fun it is to walk somewhere yenno?</p>
    </div>
  );
  let weather = (
    <div>
      {/* <p>{weatherCityData.city} Forecast Today </p>
      <p>Forecast: {weatherCityData.description}</p>
      <p>Feels like: {weatherCityData.main_feels_like}</p>
      <p>Temperature: {weatherCityData.main_temp}⁰F </p>
      <p>Humidity: {weatherCityData.main_humidity}</p> */}
    </div>
  );
  // retrieves the data from DS API and sets to state;
  useEffect(() => {
    reportRentData(compareList.city1, compareList.state1)
      .then(res => {
        console.log('reportRentData RES', res.data);
        setThisCityData(res);
      })
      .catch(err => {
        console.log(err);
      });

    reportWeatherData(compareList.city1, compareList.state1)
      .then(res => {
        console.log('reportWeatherData RES', res.data);
        setweatherCityData(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    reportWalkData(compareList.city1, compareList.state1)
      .then(res => {
        console.log('reportWalkData RES', res.data);
        setwalkCityData(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [compareList]);

  return (
    compareList && (
      <div>
        <Plot data={thisCityData.data} layout={thisCityData.layout} />
        <Popover content={walk} title="Walkability Score" trigger="click">
          <Button type="primary">Walkability</Button>
        </Popover>
        <Popover content={weather} title="Weather" trigger="click">
          <Button type="primary">Weather</Button>
        </Popover>
      </div>
    )
  );
}
