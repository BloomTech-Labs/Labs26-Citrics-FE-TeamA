import React, { useEffect, useState, useContext } from 'react';
import axios from '../../../api/dsapi';
import { ReportContext } from '../../../state/contexts/ReportContext';
import WalkscoreInfo from '../../common/WalkscoreInfo';
// Plotly Helper Components
import WeatherData from './PlotlyHelpers/weather';
import WalkData from './PlotlyHelpers/walkData';
import UnemploymentPlot from './PlotlyHelpers/UnemploymentPlot';
import RentPlot from './PlotlyHelpers/RentPlot';
import RentPredict from './PlotlyHelpers/RentPredict';
import JobIndustryViz from './PlotlyHelpers/JobIndustry';
import WeatherPredictViz from './PlotlyHelpers/WeatherPredict';
import HideCity from './PlotlyHelpers/hideCity';
import PopData from './PlotlyHelpers/PopData';
export default function Plotly(props) {
  //  useState for all the different components
  const [thisCityData, setThisCityData] = useState({});
  const [walkCityData, setWalkCityData] = useState({
    visible: false,
  });
  const [popData, setPopData] = useState([]);
  const [weatherCityData, setWeatherCityData] = useState({});
  const [unemployment, setUnemployment] = useState({});
  const [jobIndustry, setJobIndustry] = useState({});
  const [weatherPredict, setWeatherPredict] = useState({});
  const [rentalPredictData, setRentalPredictData] = useState([]);
  const [rentalFill, setRentalFill] = useState({});
  let { compareList, setCompareList, searching, setSearching } = useContext(
    ReportContext
  );
  let popFill = {};
  let walkFill = {};
  let weatherFill = {};
  let lastCityAdded = compareList.cities[compareList.cities.length - 1];
  let lastCityLength = lastCityAdded.length;
  let lastCity = lastCityAdded[lastCityLength - 2];
  let lastState = lastCityAdded[lastCityLength - 1];
  // Gets the ---UNEMPLOYMENT--- chart from the DS API, sets it to unemployment
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
  // retrieves the ---WEATHER--- data from DS API, sets it to weatherCityData
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
        setWeatherCityData({
          cityWeather1: res,
        });
      } else if (
        'cityWeather1' in weatherCityData &&
        !('cityWeather2' in weatherCityData) &&
        compareList.cities.length === 2
      ) {
        setWeatherCityData({
          ...weatherCityData,
          cityWeather2: res,
        });
      } else if (
        'cityWeather2' in weatherCityData &&
        compareList.cities.length === 3 &&
        (!('cityWeather3' in weatherCityData) ||
          weatherCityData['cityWeather3'] === undefined)
      ) {
        setWeatherCityData({
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
  // retrieves the ---WALK--- city data from DS API and sets it to walkCityData
  useEffect(() => {
    // For search bar loading knowledge
    setSearching({
      ...searching,
      walkability: true,
    });
    async function fetchWalkData() {
      const request = await axios.get(`/walkability/${lastCity}_${lastState}`);
      const popReq = await axios.get(`/census/${lastCity}_${lastState}`);
      const res = JSON.parse(request.data);
      const popRes = JSON.parse(popReq.data);
      const popFiller = popData;
      popFiller.push(popRes);
      setPopData(popFiller);
      if (!('cityWalk1' in walkCityData)) {
        setWalkCityData({
          cityWalk1: res,
        });
      } else if (
        'cityWalk1' in walkCityData &&
        !('cityWalk2' in walkCityData) &&
        compareList.cities.length === 2
      ) {
        setWalkCityData({
          ...walkCityData,
          cityWalk2: res,
        });
      } else if (
        'cityWalk2' in walkCityData &&
        compareList.cities.length === 3 &&
        (!('cityWalk3' in walkCityData) ||
          walkCityData['cityWalk3'] === undefined)
      ) {
        setWalkCityData({
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
  let cityWeather1 = weatherCityData.cityWeather1;
  let cityWeather2 = weatherCityData.cityWeather2;
  let cityWeather3 = weatherCityData.cityWeather3;
  //  Sets render data for walk response
  function dynamicWalkFill(cityNumber, number) {
    if (cityNumber !== undefined) {
      walkFill[number] = [
        <div className="walkData" key={cityNumber}>
          <h3>Walkscore</h3>
          <p className="walkscore-num">{cityNumber.walkability}</p>
          <WalkscoreInfo walk={walkCityData} setWalk={setWalkCityData} />
        </div>,
      ];
    }
  }

  function dynamicPopFill(number) {
    if (popData[number] !== undefined) {
      let num = popData[number][0].popestimate2019.toLocaleString("en-US");
      popFill[number] = [
        <div className='popData' key={number}>
          <h3>Population</h3>
          <p className='pop-num'>{num}</p>
        </div>
      ];
    }
  }

  let tempClass = ['main-temperature', 'main-temperature', 'main-temperature'];
  function getTempsToSetClass(cityNum, num) {
    num -= 1;
    cityNum
      ? cityNum.imperial_main_temp < 60
        ? (tempClass[num] += ' tooCold')
        : cityNum.imperial_main_temp > 80
        ? (tempClass[num] += ' tooHot')
        : (tempClass[num] += ' justRight')
      : (tempClass[num] = ['main-temperature']);
  }
  getTempsToSetClass(cityWeather1, 1);
  getTempsToSetClass(cityWeather2, 2);
  getTempsToSetClass(cityWeather3, 3);
  // Sets render data for weather from weather response
  function dynamicWeatherFill(cityNumber, number) {
    if (cityNumber !== undefined) {
      weatherFill[number] = [
        <div
          className={`weatherData ${cityNumber.description}`}
          key={cityNumber}
        >
          <h3>Weather</h3>
          <div className="temperature-div">
            <div className={tempClass[number]}>
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
              <p>
                Today's <br /> Forecast:{' '}
              </p>
              <p>{cityNumber.description}</p>
              <p>Clouds Today: </p>
              <p>{cityNumber.clouds_all}%</p>
              <p>Humidity: </p>
              <p>{cityNumber.main_humidity}</p>
              <p>Pressure: </p>
              <p>{cityNumber.main_pressure}</p>
              <p>Visibility: </p>
              <p>{cityNumber.imperial_visibility}</p>
              <p>Wind direction: </p>
              <p>{cityNumber.wind_deg}°</p>
              <p>Wind Speed: </p>
              <p>{cityNumber.imperial_wind_speed}mph</p>
            </div>
          </div>
        </div>,
      ];
    }
  }
  let cityDisplayPlot = 'cityDisplayPlot';
  let cityDisplayTab = 'cityDisplayPlot cityDisplayTablet';
  let hideCityOptions = {
    compareList,
    setCompareList,
    weatherCityData,
    setWeatherCityData,
    walkCityData,
    setWalkCityData,
    popData,
    setPopData,
    popFill,
    rentalFill,
    setRentalFill,
    rentalPredictData,
    setRentalPredictData,
    setSearching,
  };
  function dynamicMainData(cityNumber, number) {
    return (
      cityNumber !== undefined && (
        <div
          className={
            compareList.cities.length === 1 ? cityDisplayTab : cityDisplayPlot
          }
          id="cityNumber"
        >
          <div className="city-title">
            <h1>{cityNumber.city}</h1>
            <button
              className="remove-btn"
              id={'btn' + (number + 1)}
              onClick={e => {
                HideCity(e, hideCityOptions);
              }}
            >
              x
            </button>
          </div>
          <PopData population={{ popFill, number }}/>
          <WalkData walk={{ walkFill, number }} />
          <WeatherData weather={{ weatherFill, number }} />
        </div>
      )
    );
  }
  dynamicPopFill(0);
  dynamicPopFill(1);
  dynamicPopFill(2);
  dynamicWalkFill(cityWalk1, 0);
  dynamicWalkFill(cityWalk2, 1);
  dynamicWalkFill(cityWalk3, 2);
  dynamicWeatherFill(cityWeather1, 0);
  dynamicWeatherFill(cityWeather2, 1);
  dynamicWeatherFill(cityWeather3, 2);

  const rentPlotOptions = {
    searching,
    setSearching,
    compareList,
    lastCity,
    lastState,
    lastCityAdded,
    setThisCityData,
  };
  return (
    <section>
      <div className="vizs">
        <RentPlot
          thisCityData={thisCityData}
          rentPlotOptions={rentPlotOptions}
        />
        {/* <RentPredictViz
          compareList={compareList.cities}
          lastCityState={{ lastCity, lastState, lastCityAdded }}
          searching={{ searching, setSearching }}
        /> */}
        <UnemploymentPlot unemployment={unemployment} />
        <WeatherPredictViz
          weatherPrediction={{ weatherPredict, setWeatherPredict }}
          compareList={compareList.cities}
          lastCityState={{ lastCity, lastState, lastCityAdded }}
          searching={{ searching, setSearching }}
        />
      </div>
      <JobIndustryViz
        searching={{ searching, setSearching }}
        lastCityState={{ lastCity, lastState, lastCityAdded }}
        compareList={compareList.cities}
        jobTable={{ jobIndustry, setJobIndustry }}
      />
      <RentPredict
        compareList={compareList.cities}
        lastCityState={{ lastCity, lastState, lastCityAdded }}
        searching={{ searching, setSearching }}
        rentalData={{
          rentalFill,
          rentalPredictData,
          setRentalPredictData,
        }}
      />
      <div className="weathers">
        {dynamicMainData(cityWeather1, 0)}
        {dynamicMainData(cityWeather2, 1)}
        {dynamicMainData(cityWeather3, 2)}
      </div>
    </section>
  );
}
