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
  const [thisCityData, setThisCityData] = useState({});
  const [walkCityData, setwalkCityData] = useState([]);
  const [weatherCityData, setweatherCityData] = useState({});
  const [renderThis, setRenderThis] = useState([]);
  let { compareList } = useContext(ReportContext);
  let walkFill = {};
  let weatherFill = {};
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
        if (!('cityData1' in thisCityData)) {
          setThisCityData({
            cityData1: res.data,
            cityLayout1: res.layout,
          });
        }
        if ('cityData1' in thisCityData && !('cityData2' in thisCityData)) {
          setThisCityData({
            ...thisCityData,
            cityData2: res.data,
            cityLayout2: res.layout,
          });
        }
        if (
          'cityData1' in thisCityData &&
          'cityData2' in thisCityData &&
          !('cityData3' in thisCityData)
        ) {
          setThisCityData({
            ...thisCityData,
            cityData3: res.data,
            cityLayout3: res.layout,
          });
        }
      })
      .catch(err => {});

    reportWeatherData(lastCityAdded[0], lastCityAdded[1])
      .then(res => {
        if (!('cityWeather1' in weatherCityData)) {
          setweatherCityData({
            cityWeather1: res,
          });
        }

        if (
          'cityWeather1' in weatherCityData &&
          !('cityWeather2' in weatherCityData)
        ) {
          setweatherCityData({
            ...weatherCityData,
            cityWeather2: res,
          });
        }

        if (
          'cityWeather2' in weatherCityData &&
          !('cityWeather3' in weatherCityData)
        ) {
          setweatherCityData({
            ...weatherCityData,
            cityWeather3: res,
          });
        }
      })
      .catch(err => {});

    reportWalkData(lastCityAdded[0], lastCityAdded[1])
      .then(res => {
        if (!('cityWalk1' in walkCityData)) {
          setwalkCityData({
            cityWalk1: res,
          });
        } else if (
          'cityWalk1' in walkCityData &&
          !('cityWalk2' in walkCityData)
        ) {
          setwalkCityData({
            ...walkCityData,
            cityWalk2: res,
          });
        } else if (
          'cityWalk2' in walkCityData &&
          !('cityWalk3' in walkCityData)
        ) {
          setwalkCityData({
            ...walkCityData,
            cityWalk3: res,
          });
        }
      })
      .catch(err => {});
  }, [compareList]);

  if (walkCityData.cityWalk1 !== undefined) {
    walkFill[0] = [
      <>
        <h3>Walkability</h3>
        <p>
          {walkCityData.cityWalk1.city} Score:{' '}
          {walkCityData.cityWalk1.walkability}
        </p>{' '}
        <p>How fun it is to walk somewhere yenno?</p>
      </>,
    ];
  }
  if (walkCityData.cityWalk2 !== undefined) {
    walkFill[1] = [
      <>
        <h3>Walkability</h3>
        <p>
          {walkCityData.cityWalk2.city} Score:{' '}
          {walkCityData.cityWalk2.walkability}
        </p>{' '}
        <p>How fun it is to walk somewhere yenno?</p>
      </>,
    ];
  }
  if (walkCityData.cityWalk3 !== undefined) {
    walkFill[2] = [
      <>
        <h3>Walkability</h3>
        <p>
          {walkCityData.cityWalk3.city} Score:{' '}
          {walkCityData.cityWalk3.walkability}
        </p>{' '}
        <p>How fun it is to walk somewhere yenno?</p>
      </>,
    ];
  }

  if (weatherCityData.cityWeather1 !== undefined) {
    weatherFill[0] = [
      <>
        <h3>Weather</h3>
        <p>
          Today's Forecast: {weatherCityData.cityWeather1.description} for{' '}
          {weatherCityData.cityWeather1.city}
        </p>
        <p>{weatherCityData.cityWeather1.description}</p>
        <p>Cloud Percentage: {weatherCityData.cityWeather1.clouds_all}</p>
        <p>Feels Like: {weatherCityData.cityWeather1.main_feels_like}</p>
        <p>Humidity: {weatherCityData.cityWeather1.main_humidity}</p>
        <p>Pressure: {weatherCityData.cityWeather1.main_pressure}</p>
        <p>Temperature: {weatherCityData.cityWeather1.main_temp}</p>
        <p>Max: {weatherCityData.cityWeather1.main_temp_max}</p>
        <p>Min: {weatherCityData.cityWeather1.main_temp_min}</p>
        <p>Visibility: {weatherCityData.cityWeather1.visibility}</p>
        <p>Degree of wind direction: {weatherCityData.cityWeather1.wind_deg}</p>
        <p>Wind Speed: {weatherCityData.cityWeather1.wind_speed}</p>
      </>,
    ];
  }
  if (weatherCityData.cityWeather2 !== undefined) {
    weatherFill[1] = [
      <>
        <h3>Weather</h3>
        <p>
          Today's Forecast: {weatherCityData.cityWeather2.main} for{' '}
          {weatherCityData.cityWeather2.city}
        </p>
        <p>{weatherCityData.cityWeather2.description}</p>
        <p>Cloud Percentage: {weatherCityData.cityWeather2.clouds_all}</p>
        <p>Feels Like: {weatherCityData.cityWeather2.main_feels_like}</p>
        <p>Humidity: {weatherCityData.cityWeather2.main_humidity}</p>
        <p>Pressure: {weatherCityData.cityWeather2.main_pressure}</p>
        <p>Temperature: {weatherCityData.cityWeather2.main_temp}</p>
        <p>Max: {weatherCityData.cityWeather2.main_temp_max}</p>
        <p>Min: {weatherCityData.cityWeather2.main_temp_min}</p>
        <p>Visibility: {weatherCityData.cityWeather2.visibility}</p>
        <p>Degree of wind direction: {weatherCityData.cityWeather2.wind_deg}</p>
        <p>Wind Speed: {weatherCityData.cityWeather2.wind_speed}</p>
      </>,
    ];
  }
  if (weatherCityData.cityWeather3 !== undefined) {
    weatherFill[2] = [
      <>
        <h3>Weather</h3>
        <p>
          Today's Forecast: {weatherCityData.cityWeather3.main} for{' '}
          {weatherCityData.cityWeather3.city}
        </p>
        <p>{weatherCityData.cityWeather3.description}</p>
        <p>Cloud Percentage: {weatherCityData.cityWeather3.clouds_all}</p>
        <p>Feels Like: {weatherCityData.cityWeather3.main_feels_like}</p>
        <p>Humidity: {weatherCityData.cityWeather3.main_humidity}</p>
        <p>Pressure: {weatherCityData.cityWeather3.main_pressure}</p>
        <p>Temperature: {weatherCityData.cityWeather3.main_temp}</p>
        <p>Max: {weatherCityData.cityWeather3.main_temp_max}</p>
        <p>Min: {weatherCityData.cityWeather3.main_temp_min}</p>
        <p>Visibility: {weatherCityData.cityWeather3.visibility}</p>
        <p>Degree of wind direction: {weatherCityData.cityWeather3.wind_deg}</p>
        <p>Wind Speed: {weatherCityData.cityWeather3.wind_speed}</p>
      </>,
    ];
  }

  return (
    <div>
      <div>
        {' '}
        {thisCityData && (
          <>
            <Plot
              data={thisCityData.cityData1}
              layout={thisCityData.cityLayout1}
            />{' '}
            {!walkFill[0] ? <h2>Loading...</h2> : walkFill[0]}
            {!weatherFill[0] ? <h2>Loading...</h2> : weatherFill[0]}
          </>
        )}
      </div>{' '}
      <div>
        {' '}
        {thisCityData.cityLayout2 !== undefined && (
          <>
            <Plot
              data={thisCityData.cityData2}
              layout={thisCityData.cityLayout2}
            />
            {!walkFill[1] ? <h2>Loading...</h2> : walkFill[1]}
            {!weatherFill[1] ? <h2>Loading...</h2> : weatherFill[1]}
          </>
        )}
      </div>{' '}
      <div>
        {' '}
        {thisCityData.cityLayout3 !== undefined && (
          <>
            <Plot
              data={thisCityData.cityData3}
              layout={thisCityData.cityLayout3}
            />
            {!walkFill[2] ? <h2>Loading...</h2> : walkFill[2]}
            {!weatherFill[2] ? <h2>Loading...</h2> : weatherFill[2]}
          </>
        )}
      </div>
    </div>
  );
}
