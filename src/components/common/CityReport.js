import React, { useEffect } from 'react';
import { reportWalkData, reportWeatherData } from '../../api/reportData';
import Plot from 'react-plotly.js';
import './styles/CityReport.scss';

function CityReport() {
  useEffect((city, state) => {
    getWalkData(city, state);
    getWeatherData(city, state);
  }, []);

  const getWalkData = (city, state) => {
    reportWalkData()
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getWeatherData = (city, state) => {
    reportWeatherData()
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="report-container">
        <div className="average-rent">
          <h1>Average Rent</h1>
        </div>
        <div className="weather">
          <h1>Weather</h1>
        </div>
        <div className="weather">
          <h1>Weather</h1>
        </div>
        <div className="weather">
          <h1>Weather</h1>
        </div>
        <div className="weather">
          <h1>Weather</h1>
        </div>
      </div>
    </div>
  );
}

export default CityReport;
