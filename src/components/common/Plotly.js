import React, { useEffect, useState, useContext } from 'react';
import Plot from 'react-plotly.js';
import {
  reportRentData,
  reportWeatherData,
  reportWalkData,
  unemploymentData,
} from '../../api/reportData';
import axios from './../../api/dsapi';
import { ReportContext } from '../../state/contexts/ReportContext';
import Loader from './Loader';

export default function Plotly() {
  //  State for plotly json info
  const [thisCityData, setThisCityData] = useState({});
  const [walkCityData, setwalkCityData] = useState([]);
  const [weatherCityData, setweatherCityData] = useState({});
  const [unemployment, setUnemployment] = useState({});
  let { compareList, setCompareList } = useContext(ReportContext);
  let walkFill = {};
  let weatherFill = {};
  let unemploymentFill = {};
  let lastCityAdded = compareList.cities[compareList.cities.length - 1];
  let lastCityLength = lastCityAdded.length;
  let lastCity = lastCityAdded[lastCityLength - 2];
  let lastState = lastCityAdded[lastCityLength - 1];

  // useEffect for fetching rent data viz from ds backend
  // sets the cityData and cityLayout for following cities
  useEffect(() => {
    async function fetchRentData() {
      if (compareList.cities.length === 1) {
        const request = await axios.get(`/rent_viz2/${lastCity}_${lastState}`);
        const rentData = JSON.parse(request.data);

        setThisCityData({
          cityData1: rentData.data,
          cityLayout1: rentData.layout,
        });
      } else if (compareList.cities.length === 2) {
        let firstCity = compareList.cities[compareList.cities.length - 2];
        const request = await axios.get(
          `/rent_viz2/${firstCity[0]}_${firstCity[1]}?city2=${lastCityAdded[0]}&statecode2=${lastCityAdded[1]}`
        );

        const rentData = JSON.parse(request.data);
        setThisCityData({
          cityData1: rentData.data,
          cityLayout1: rentData.layout,
        });
      } else if (compareList.cities.length === 3) {
        let firstCity = compareList.cities[compareList.cities.length - 3];
        let secondCity = compareList.cities[compareList.cities.length - 2];
        const request = await axios.get(
          `/rent_viz2/${firstCity[0]}_${firstCity[1]}?city2=${secondCity[0]}&statecode2=${secondCity[1]}&city3=${lastCityAdded[0]}&statecode3=${lastCityAdded[1]}`
        );

        const rentData = JSON.parse(request.data);
        setThisCityData({
          cityData1: rentData.data,
          cityLayout1: rentData.layout,
        });
      }
    }
    fetchRentData();
  }, [lastState, lastCity]);

  // Gets the unemployment chart from the DS API
  useEffect(() => {
    async function fetchUnemploymentData() {
      if (compareList.cities.length === 1) {
        const request = await axios.get(`/viz/${lastState}`);
        const unemploymentData = JSON.parse(request.data);
        setUnemployment(unemploymentData);
      } else if (compareList.cities.length === 2) {
        let firstState = compareList.cities[compareList.cities.length - 2][1];
        const request = await axios.get(
          `/viz/${firstState}?statecode2=${lastState}`
        );
        const unemploymentData = JSON.parse(request.data);
        setUnemployment(unemploymentData);
      } else if (compareList.cities.length === 3) {
        let firstState = compareList.cities[compareList.cities.length - 3][1];
        let secondState = compareList.cities[compareList.cities.length - 2][1];

        const request = await axios.get(
          `/viz/${firstState}?statecode2=${secondState}&statecode3=${lastState}`
        );
        const unemploymentData = JSON.parse(request.data);
        setUnemployment(unemploymentData);
      }
    }
    fetchUnemploymentData();
  }, [lastState]);

  // retrieves the data from DS API and sets to state;
  useEffect(() => {
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
      <div className="walkData">
        <h3>Walkability</h3>
        <p>
          {walkCityData.cityWalk1.city} Score:{' '}
          {walkCityData.cityWalk1.walkability}
        </p>
      </div>,
    ];
  }
  if (walkCityData.cityWalk2 !== undefined) {
    walkFill[1] = [
      <div className="walkData">
        <h3>Walkability</h3>
        <p>
          {walkCityData.cityWalk2.city} Score:{' '}
          {walkCityData.cityWalk2.walkability}
        </p>
      </div>,
    ];
  }

  if (walkCityData.cityWalk3 !== undefined) {
    walkFill[2] = [
      <div className="walkData">
        <h3>Walkability</h3>
        <p>
          {walkCityData.cityWalk3.city} Score:{' '}
          {walkCityData.cityWalk3.walkability}
        </p>
      </div>,
    ];
  }

  let city1 = weatherCityData.cityWeather1;
  let city2 = weatherCityData.cityWeather2;
  let city3 = weatherCityData.cityWeather3;
  if (city1 !== undefined) {
    weatherFill[0] = [
      <div className="weatherData">
        <h3>{city1.city}'s Weather</h3>
        <div className="temperature-div">
          <div className="main-temperature">
            <h1>{city1.imperial_main_temp}°</h1>
          </div>
          <div className="other-temperature">
            <p>Feels Like: {city1.imperial_main_feels_like}°</p>
            <p>
              {city1.imperial_main_temp_max}°/{city1.imperial_main_temp_min}°
            </p>
          </div>
        </div>
        <div className="weather-stat-div">
          <div className="weather-stat-titles">
            <p>Today's Forecast: </p>
            <p>Clouds Today: </p>
            <p>Humidity: </p>
            <p>Pressure: </p>
            <p>Visibility: </p>
            <p>Wind direction: </p>
            <p>Wind Speed: </p>
          </div>
          <div className="weather-stat-nums">
            <p>{city1.description}</p>
            <p>{city1.clouds_all}%</p>
            <p>{city1.main_humidity}</p>
            <p>{city1.main_pressure}</p>
            <p>{city1.imperial_visibility}</p>
            <p>{city1.wind_deg}°</p>
            <p>{city1.imperial_wind_speed}mph</p>
          </div>
        </div>
      </div>,
    ];
  }
  if (city2 !== undefined) {
    weatherFill[1] = [
      <div className="weatherData">
        <h3>{city2.city}'s Weather</h3>
        <div className="temperature-div">
          <div className="main-temperature">
            <h1>{city2.imperial_main_temp}°</h1>
          </div>
          <div className="other-temperature">
            <p>Feels like {city2.imperial_main_feels_like}°</p>
            <p>
              {city2.imperial_main_temp_max}°/{city2.imperial_main_temp_min}°
            </p>
          </div>
        </div>
        <div className="weather-stat-div">
          <div className="weather-stat-titles">
            <p>Today's Forecast: </p>
            <p>Clouds Today: </p>
            <p>Humidity: </p>
            <p>Pressure: </p>
            <p>Visibility: </p>
            <p>Wind direction: </p>
            <p>Wind Speed: </p>
          </div>
          <div className="weather-stat-nums">
            <p>{city2.description}</p>
            <p>{city2.clouds_all}%</p>
            <p>{city2.main_humidity}</p>
            <p>{city2.main_pressure}</p>
            <p>{city2.imperial_visibility}</p>
            <p>{city2.wind_deg}°</p>
            <p>{city2.imperial_wind_speed}mph</p>
          </div>
        </div>
      </div>,
    ];
  }
  if (city3 !== undefined) {
    weatherFill[2] = [
      <div className="weatherData">
        <h3>{city3.city}'s Weather</h3>
        <div className="temperature-div">
          <div className="main-temperature">
            <h1>{city3.imperial_main_temp}°</h1>
          </div>
          <div className="other-temperature">
            <p>Feels Like: {city3.imperial_main_feels_like}°</p>
            <p>
              {city3.imperial_main_temp_max}°/{city3.imperial_main_temp_min}°
            </p>
          </div>
        </div>
        <div className="weather-stat-div">
          <div className="weather-stat-titles">
            <p>Today's Forecast: </p>
            <p>Clouds Today: </p>
            <p>Humidity: </p>
            <p>Pressure: </p>
            <p>Visibility: </p>
            <p>Wind direction: </p>
            <p>Wind Speed: </p>
          </div>
          <div className="weather-stat-nums">
            <p>{city3.description}</p>
            <p>{city3.clouds_all}%</p>
            <p>{city3.main_humidity}</p>
            <p>{city3.main_pressure}</p>
            <p>{city3.imperial_visibility}</p>
            <p>{city3.wind_deg}°</p>
            <p>{city3.imperial_wind_speed}mph</p>
          </div>
        </div>
      </div>,
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
      justifyContent: 'space-around',
    };
  }

  function hideCity(event) {
    // id of button the user clicks
    let id = event.target.id;
    const length = compareList.cities.length;

    // if 3 cities are being compared
    if (length === 3) {
      // copying citydata3 and citylayout3
      let fillerData = thisCityData.cityData3;
      let fillerLayout = thisCityData.cityLayout3;
      // if btn user clicked matches btn id
      if (id === 'btn1') {
        // remove city from compareList
        compareList.cities.shift();
        delete thisCityData.cityData3;
        delete thisCityData.cityLayout3;
        delete weatherCityData.cityWeather3;
        delete walkCityData.cityWalk3;
        setThisCityData({
          ...thisCityData,
          cityData1: thisCityData.cityData2,
          cityLayout1: thisCityData.cityLayout2,
          cityData2: fillerData,
          cityLayout2: fillerLayout,
        });
      } else if (id === 'btn2') {
        compareList.cities.splice(1, 1);
        delete thisCityData.cityData3;
        delete thisCityData.cityLayout3;
        delete weatherCityData.cityWeather3;
        delete walkCityData.cityWalk3;
        setThisCityData({
          ...thisCityData,
          cityData2: fillerData,
          cityLayout2: fillerLayout,
        });
      } else if (id === 'btn3') {
        compareList.cities.pop();
        delete thisCityData.cityData3;
        delete thisCityData.cityLayout3;
        delete weatherCityData.cityWeather3;
        delete walkCityData.cityWalk3;
        setThisCityData({
          ...thisCityData,
        });
      }
      // if 2 cities are being compared
    } else if (length === 2) {
      let fillerData = thisCityData.cityData2;
      let fillerLayout = thisCityData.cityLayout2;
      if (id === 'btn1') {
        // remove city from compareList
        compareList.cities.shift();
        delete thisCityData.cityData2;
        delete thisCityData.cityLayout2;
        delete weatherCityData.cityWeather2;
        delete walkCityData.cityWalk2;
        setThisCityData({
          cityData1: fillerData,
          cityLayout1: fillerLayout,
        });
      } else if (id === 'btn2') {
        compareList.cities.pop();
        delete thisCityData.cityData2;
        delete thisCityData.cityLayout2;
        delete weatherCityData.cityWeather2;
        delete walkCityData.cityWalk2;
        setThisCityData({
          ...thisCityData,
        });
      } // if 1 city is being compared
    } else if (length === 1) {
      if (id === 'btn1') {
        // remove city and set state back to static component
        compareList.cities.shift();
        setCompareList({
          cities: [],
          searched: false,
        });
      }
    }
  }
  return (
    <section>
      {!thisCityData.cityData1 ? (
        <Loader />
      ) : (
        <div>
          <Plot
            data={thisCityData.cityData1}
            layout={thisCityData.cityLayout1}
          />
        </div>
      )}
      {!('data' in unemployment) ? (
        <Loader />
      ) : (
        <Plot data={unemployment.data} layout={unemployment.layout} />
      )}

      <div className="weathers">
        {thisCityData && (
          <div className="cityDisplayPlot" id="city1">
            {' '}
            <button id="btn1" onClick={e => hideCity(e)}>
              Remove
            </button>
            {!walkFill[0] ? <Loader /> : walkFill[0]}
            {!weatherFill[0] ? <Loader /> : weatherFill[0]}
          </div>
        )}
        {city2 !== undefined && (
          <div className="cityDisplayPlot" id="city2">
            <div>
              <button id="btn2" onClick={e => hideCity(e)}>
                Remove
              </button>
            </div>
            {!walkFill[1] ? <Loader /> : walkFill[1]}
            {!weatherFill[1] ? <Loader /> : weatherFill[1]}
          </div>
        )}
        {city3 !== undefined && (
          <div className="cityDisplayPlot" id="city3">
            <div>
              <button id="btn3" onClick={e => hideCity(e)}>
                Remove
              </button>
            </div>
            {!walkFill[2] ? <Loader /> : walkFill[2]}
            {!weatherFill[2] ? <Loader /> : weatherFill[2]}
          </div>
        )}
      </div>
    </section>
  );
}
