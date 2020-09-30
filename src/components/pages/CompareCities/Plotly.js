import React, { useEffect, useState, useContext } from 'react';
import axios from '../../../api/dsapi';
import { ReportContext } from '../../../state/contexts/ReportContext';
import WalkscoreInfo from '../../common/WalkscoreInfo';
import WeatherPlot from './PlotlyHelpers/weatherPlot';
import WalkData from './PlotlyHelpers/walkData';
import UnemploymentPlot from './PlotlyHelpers/UnemploymentPlot';
import RentPlot from './PlotlyHelpers/RentPlot';

export default function Plotly(props) {
  let searching = props.searchOptions.searching;
  let setSearching = props.searchOptions.setSearching;
  //  State for plotly json info
  const [thisCityData, setThisCityData] = useState({});
  const [walkCityData, setwalkCityData] = useState({
    visible: false,
  });
  const [weatherCityData, setweatherCityData] = useState({});
  const [unemployment, setUnemployment] = useState({});
  let { compareList, setCompareList } = useContext(ReportContext);
  let walkFill = {};
  let weatherFill = {};
  let lastCityAdded = compareList.cities[compareList.cities.length - 1];
  let lastCityLength = lastCityAdded.length;
  let lastCity = lastCityAdded[lastCityLength - 2];
  let lastState = lastCityAdded[lastCityLength - 1];

  // useEffect for fetching rent data viz from ds backend
  // sets the cityData and cityLayout for following cities into thisCityData
  useEffect(() => {
    // For search bar loading knowledge

    setSearching({
      ...searching,
      rent: true,
    });
    async function fetchRentData() {
      if (compareList.cities.length === 1) {
        const request = await axios.get(`/rent_viz/${lastCity}_${lastState}`);
        const rentData = JSON.parse(request.data);
        setThisCityData({
          cityData1: rentData.data,
          cityLayout1: rentData.layout,
        });
      } else if (compareList.cities.length === 2) {
        let firstCity = compareList.cities[compareList.cities.length - 2];
        const request = await axios.get(
          `/rent_viz/${firstCity[0]}_${firstCity[1]}?city2=${lastCityAdded[0]}&statecode2=${lastCityAdded[1]}`
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
          `/rent_viz/${firstCity[0]}_${firstCity[1]}?city2=${secondCity[0]}&statecode2=${secondCity[1]}&city3=${lastCityAdded[0]}&statecode3=${lastCityAdded[1]}`
        );

        const rentData = JSON.parse(request.data);
        setThisCityData({
          cityData1: rentData.data,
          cityLayout1: rentData.layout,
        });
      }
      setSearching({
        ...searching,
        rent: true,
      });
    }
    fetchRentData();
  }, [lastState, lastCity, lastCityAdded, compareList.cities]);

  // Gets the unemployment chart from the DS API, sets it to unemployment
  useEffect(() => {
    // For search bar loading knowledge
    setSearching({
      ...searching,
      unemployment: true,
    });
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
      setSearching({
        ...searching,
        unemployment: false,
      });
    }
    fetchUnemploymentData();
  }, [lastState, compareList.cities]);

  // retrieves the weather data from DS API, sets it to weatherCityData
  useEffect(() => {
    // For search bar loading knowledge
    setSearching({
      ...searching,
      weather: true,
    });
    async function fetchWeatherData() {
      const request = await axios.get(`/current/${lastCity}_${lastState}`);
      const res = JSON.parse(request.data);
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
      setSearching({
        ...searching,
        weather: false,
      });
    }
    fetchWeatherData();
  }, [lastState, lastCity]);

  // retrieves the walk city data from DS API and sets it to walkCityData
  useEffect(() => {
    //  WALKABILITY IS NOT RETRIEVING AT THE MOMENT
    //  UNCOMMENT WHEN WALKABILITY LINK WORKS
    // For search bar loading knowledge
    // setSearching({
    //   ...searching,
    //   walkability: true,
    // });
    async function fetchWalkData() {
      const request = await axios.get(`/walkability/${lastCity}_${lastState}`);
      const res = JSON.parse(request.data);
      if (!('cityWalk1' in walkCityData)) {
        setwalkCityData({
          cityWalk1: res,
        });
      }
      if ('cityWalk1' in walkCityData && !('cityWalk2' in walkCityData)) {
        setwalkCityData({
          ...walkCityData,
          cityWalk2: res,
        });
      }
      if ('cityWalk2' in walkCityData && !('cityWalk3' in walkCityData)) {
        setwalkCityData({
          ...walkCityData,
          cityWalk3: res,
        });
      }
      setSearching({
        ...searching,
        walkability: false,
      });
    }
    fetchWalkData();
  }, [lastCity, lastState]);

  let cityWalk1 = walkCityData.cityWalk1;
  let cityWalk2 = walkCityData.cityWalk2;
  let cityWalk3 = walkCityData.cityWalk3;
  let city1 = weatherCityData.cityWeather1;
  let city2 = weatherCityData.cityWeather2;
  let city3 = weatherCityData.cityWeather3;
  //  Sets render data for walk response
  function dynamicWalkFill(cityNumber, number) {
    if (cityNumber !== undefined) {
      walkFill[number] = [
        <div className="walkData">
          <h3>Walkscore</h3>
          <p className="walkscore-num">{cityNumber.walkability}</p>
          <WalkscoreInfo
            walkCityData={walkCityData}
            setwalkCityData={setwalkCityData}
          />
        </div>,
      ];
    }
  }
  // Sets render data for weather from weather response
  function dynamicWeatherFill(cityNumber, number) {
    if (cityNumber !== undefined) {
      weatherFill[number] = [
        <div className="weatherData">
          <h3>Weather</h3>
          <div className="temperature-div">
            <div className="main-temperature">
              <h1>{cityNumber.imperial_main_temp}°</h1>
            </div>
            <div className="other-temperature">
              <p>Feels Like: {cityNumber.imperial_main_feels_like}°</p>
              <p>
                {cityNumber.imperial_main_temp_max}°/
                {cityNumber.imperial_main_temp_min}°
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
              <p>{cityNumber.description}</p>
              <p>{cityNumber.clouds_all}%</p>
              <p>{cityNumber.main_humidity}</p>
              <p>{cityNumber.main_pressure}</p>
              <p>{cityNumber.imperial_visibility}</p>
              <p>{cityNumber.wind_deg}°</p>
              <p>{cityNumber.imperial_wind_speed}mph</p>
            </div>
          </div>
        </div>,
      ];
    }
  }

  function dynamicMainData(cityNumber, number) {
    return (
      cityNumber !== undefined && (
        <div className="cityDisplayPlot" id="cityNumber">
          <div className="city-title">
            <h1>
              {thisCityData.cityData1 && thisCityData.cityData1[number].name}
            </h1>
            <button
              className="remove-btn"
              id="btn1"
              onClick={e => {
                hideCity(e);
              }}
            >
              x
            </button>
          </div>
          {/* <WalkData props={{ walkFill, number }} /> */}
          <WeatherPlot props={{ weatherFill, number }} />
        </div>
      )
    );
  }
  dynamicWalkFill(cityWalk1, 0);
  dynamicWalkFill(cityWalk2, 1);
  dynamicWalkFill(cityWalk3, 2);
  dynamicWeatherFill(city1, 0);
  dynamicWeatherFill(city2, 1);
  dynamicWeatherFill(city3, 2);

  function hideCity(event) {
    // id of button the user clicks
    let id = event.target.id;
    let copyWeather2 = weatherCityData.cityWeather2;
    let copyWeather3 = weatherCityData.cityWeather3;
    let copyWalk3 = walkCityData.cityWalk3;
    const length = compareList.cities.length;

    // if 3 cities are being compared
    if (length === 3) {
      // if btn user clicked matches btn id
      if (id === 'btn1') {
        // // remove city from compareList
        delete weatherCityData.cityWeather3;
        delete walkCityData.cityWalk3;
        setweatherCityData({
          cityWeather1: weatherCityData.cityWeather2,
          cityWeather2: copyWeather3,
        });
        setwalkCityData({
          cityWalk1: walkCityData.cityWalk2,
          cityWalk2: copyWalk3,
        });
        compareList.cities = compareList.cities.slice(1);
      } else if (id === 'btn2') {
        delete weatherCityData.cityWeather2;
        delete walkCityData.cityWalk2;
        setweatherCityData({
          cityWeather1: weatherCityData.cityWeather1,
          cityWeather2: copyWeather3,
        });
        setwalkCityData({
          cityWalk1: walkCityData.cityWalk1,
          cityWalk2: copyWalk3,
        });
        compareList.cities = [compareList.cities[0], compareList.cities[2]];
      } else if (id === 'btn3') {
        compareList.cities.pop();
        delete weatherCityData.cityWeather3;
        delete walkCityData.cityWalk3;
        setThisCityData({
          ...thisCityData,
        });
      }
      // if 2 cities are being compared
    } else if (length === 2) {
      // copy weather/walk data to be set as city1 data
      if (id === 'btn1') {
        // copying data that will be deleted upon state update
        let copyCity = compareList.cities[1];
        // remove city from compareList.cities
        compareList.cities.splice(0, 1);
        // delete walk/weather state for city 2
        delete weatherCityData.cityWeather2;
        delete walkCityData.cityWalk2;
        // updating cityweather/walk to replace old city1 data
        setweatherCityData({
          cityweather1: copyWeather2,
        });
        setwalkCityData({});
        // setting compareList cities array to be city not clicked on
        setCompareList({
          cities: [copyCity],
        });
      } else if (id === 'btn2') {
        let copyCity = compareList.cities[0];
        // remove city from compareList.cities
        compareList.cities.pop();
        // delete walk/weather state for city 2
        delete weatherCityData.cityWeather2;
        delete walkCityData.cityWalk2;
        setweatherCityData({
          cityweather1: weatherCityData.cityweather1,
        });
        setwalkCityData({});
        setCompareList({
          cities: [copyCity],
        });
      } // if 1 city is being compared
    } else if (length === 1) {
      if (id === 'btn1') {
        // remove city and set state back to static component
        compareList.cities.shift();
        delete weatherCityData.cityWeather1;
        delete walkCityData.cityWalk1;
        setCompareList({
          cities: [],
          searched: false,
        });
      }
    }
  }

  return (
    <section>
      <RentPlot thisCityData={thisCityData} />
      <UnemploymentPlot unemployment={unemployment} />
      <div className="weathers">
        {dynamicMainData(city1, 0)}
        {dynamicMainData(city2, 1)}
        {dynamicMainData(city3, 2)}
      </div>
    </section>
  );
}
