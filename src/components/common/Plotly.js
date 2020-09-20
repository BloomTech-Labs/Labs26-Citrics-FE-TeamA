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
    let lastCityAdded = compareList.cities[compareList.cities.length - 1];
    let lastCityLength = lastCityAdded.length;
    reportRentData(
      lastCityAdded[lastCityLength - 2],
      lastCityAdded[lastCityLength - 1]
    )
      .then(res => {
        setThisCityData(res);
      })
      .catch(err => {});

    reportWeatherData(lastCityAdded[0], lastCityAdded[1])
      .then(res => {
        setweatherCityData(res);
      })
      .catch(err => {});

    reportWalkData(lastCityAdded[0], lastCityAdded[1])
      .then(res => {
        setwalkCityData(res);
      })
      .catch(err => {});
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
