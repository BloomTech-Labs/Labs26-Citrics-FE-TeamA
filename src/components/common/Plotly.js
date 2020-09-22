import React, { useEffect, useState, useContext } from 'react';
import Plot from 'react-plotly.js';
import {
  reportRentData,
  reportWeatherData,
  reportWalkData,
  unemploymentData,
} from '../../api/reportData';
import { ReportContext } from '../../state/contexts/ReportContext';
import Loader from './Loader';

export default function Plotly() {
  //  State for plotly json info
  const [thisCityData, setThisCityData] = useState({});
  const [walkCityData, setwalkCityData] = useState([]);
  const [weatherCityData, setweatherCityData] = useState({});
  const [unemployment, setUnemployment] = useState({});
  let { compareList } = useContext(ReportContext);
  let walkFill = {};
  let weatherFill = {};
  let unemploymentFill = {};

  // retrieves the data from DS API and sets to state;
  useEffect(() => {
    let lastCityAdded = compareList.cities[compareList.cities.length - 1];
    let lastCityLength = lastCityAdded.length;
    unemploymentData(lastCityAdded[lastCityLength - 1])
      .then(response => {
        if (!(compareList.cities.length in unemploymentFill)) {
          unemploymentFill = unemployment;
          unemploymentFill[compareList.cities.length - 1] = response;
          setUnemployment(unemploymentFill);
        }
      })
      .catch(err => {});
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
        </p>
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
        </p>
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
        </p>
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
        <p>Cloud Percentage: {weatherCityData.cityWeather1.clouds_all}</p>
        <p>
          Feels Like: {weatherCityData.cityWeather1.imperial_main_feels_like}
        </p>
        <p>Humidity: {weatherCityData.cityWeather1.main_humidity}</p>
        <p>Pressure: {weatherCityData.cityWeather1.main_pressure}</p>
        <p>Temperature: {weatherCityData.cityWeather1.imperial_main_temp}</p>
        <p>Max: {weatherCityData.cityWeather1.imperial_main_temp_max}</p>
        <p>Min: {weatherCityData.cityWeather1.imperial_main_temp_min}</p>
        <p>Visibility: {weatherCityData.cityWeather1.imperial_visibility}</p>
        <p>Degree of wind direction: {weatherCityData.cityWeather1.wind_deg}</p>
        <p>Wind Speed: {weatherCityData.cityWeather1.imperial_wind_speed}</p>
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
        <p>
          Feels Like: {weatherCityData.cityWeather2.imperial_main_feels_like}
        </p>
        <p>Humidity: {weatherCityData.cityWeather2.imperial_main_humidity}</p>
        <p>Pressure: {weatherCityData.cityWeather2.imperial_main_pressure}</p>
        <p>Temperature: {weatherCityData.cityWeather2.imperial_main_temp}</p>
        <p>Max: {weatherCityData.cityWeather2.imperial_main_temp_max}</p>
        <p>Min: {weatherCityData.cityWeather2.imperial_main_temp_min}</p>
        <p>Visibility: {weatherCityData.cityWeather2.imperial_visibility}</p>
        <p>Degree of wind direction: {weatherCityData.cityWeather2.wind_deg}</p>
        <p>Wind Speed: {weatherCityData.cityWeather2.imperial_wind_speed}</p>
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
        <p>
          Feels Like: {weatherCityData.cityWeather3.imperial_main_feels_like}
        </p>
        <p>Humidity: {weatherCityData.cityWeather3.main_humidity}</p>
        <p>Pressure: {weatherCityData.cityWeather3.main_pressure}</p>
        <p>Temperature: {weatherCityData.cityWeather3.imperial_main_temp}</p>
        <p>Max: {weatherCityData.cityWeather3.imperial_main_temp_max}</p>
        <p>Min: {weatherCityData.cityWeather3.imperial_main_temp_min}</p>
        <p>Visibility: {weatherCityData.cityWeather3.imperial_visibility}</p>
        <p>Degree of wind direction: {weatherCityData.cityWeather3.wind_deg}</p>
        <p>Wind Speed: {weatherCityData.cityWeather3.imperial_wind_speed}</p>
      </>,
    ];
  }
  let gridStyle;
  if (compareList.cities.length === 1) {
    gridStyle = {
      display: 'grid',
      width: '100%',
      margin: '0, auto',
    };
  } else {
    gridStyle = {
      display: 'flex',
    };
  }
  return (
    <div style={gridStyle}>
      {thisCityData && (
        <div className="cityDisplayPlot">
          {!thisCityData.cityData1 ? (
            <Loader />
          ) : (
            <Plot
              data={thisCityData.cityData1}
              layout={thisCityData.cityLayout1}
            />
          )}
          {!unemployment[0] ? (
            <Loader />
          ) : (
            <Plot data={unemployment[0].data} layout={unemployment[0].layout} />
          )}
          {!walkFill[0] ? <Loader /> : walkFill[0]}
          {!weatherFill[0] ? <Loader /> : weatherFill[0]}
        </div>
      )}
      {thisCityData.cityLayout2 !== undefined && (
        <div className="cityDisplayPlot">
          {!thisCityData.cityData2 ? (
            <Loader />
          ) : (
            <Plot
              data={thisCityData.cityData2}
              layout={thisCityData.cityLayout2}
            />
          )}
          {!unemployment[1] ? (
            <Loader />
          ) : (
            <Plot data={unemployment[1].data} layout={unemployment[1].layout} />
          )}
          {!walkFill[1] ? <Loader /> : walkFill[1]}
          {!weatherFill[1] ? <Loader /> : weatherFill[1]}
        </div>
      )}
      {thisCityData.cityLayout3 !== undefined && (
        <div className="cityDisplayPlot">
          {!thisCityData.cityData2 ? (
            <Loader />
          ) : (
            <Plot
              data={thisCityData.cityData3}
              layout={thisCityData.cityLayout3}
            />
          )}
          {!unemployment[2] ? (
            <Loader />
          ) : (
            <Plot data={unemployment[2].data} layout={unemployment[2].layout} />
          )}
          {!walkFill[2] ? <Loader /> : walkFill[2]}
          {!weatherFill[2] ? <Loader /> : weatherFill[2]}
        </div>
      )}
    </div>
  );
}
