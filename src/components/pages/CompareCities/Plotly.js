import React, { useEffect, useState, useContext } from 'react';
import axios from '../../../api/dsapi';
import { ReportContext } from '../../../state/contexts/ReportContext';
import WalkscoreInfo from '../../common/WalkscoreInfo';
// Plotly Helper Components
import WeatherPlot from './PlotlyHelpers/weatherPlot';
import WalkData from './PlotlyHelpers/walkData';
import UnemploymentPlot from './PlotlyHelpers/UnemploymentPlot';
import RentPlot from './PlotlyHelpers/RentPlot';
import RentPredictViz from './PlotlyHelpers/RentPredictViz';
import RentPredict from './PlotlyHelpers/RentPredict';
import JobIndustryViz from './PlotlyHelpers/JobIndustry';
import WeatherPredictViz from './PlotlyHelpers/WeatherPredict';
export default function Plotly(props) {
  //  State for plotly json info
  const [thisCityData, setThisCityData] = useState({});
  const [walkCityData, setWalkCityData] = useState({
    visible: false,
  });
  const [weatherCityData, setWeatherCityData] = useState({});
  const [unemployment, setUnemployment] = useState({});
  const [rentPredict, setRentPredict] = useState({});
  const [jobIndustry, setJobIndustry] = useState({});
  const [weatherPredict, setWeatherPredict] = useState({});
  let { compareList, setCompareList, searching, setSearching } = useContext(
    ReportContext
  );
  let walkFill = {};
  let weatherFill = {};
  let lastCityAdded = compareList.cities[compareList.cities.length - 1];
  let lastCityLength = lastCityAdded.length;
  let lastCity = lastCityAdded[lastCityLength - 2];
  let lastState = lastCityAdded[lastCityLength - 1];
  // useEffect for fetching ---RENT--- data viz from ds backend
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
          cityData: rentData.data,
          cityLayout: rentData.layout,
        });
      } else if (compareList.cities.length === 2) {
        let firstCity = compareList.cities[compareList.cities.length - 2];
        const request = await axios.get(
          `/rent_viz/${firstCity[0]}_${firstCity[1]}?city2=${lastCityAdded[0]}&statecode2=${lastCityAdded[1]}`
        );
        const rentData = JSON.parse(request.data);
        setThisCityData({
          cityData: rentData.data,
          cityLayout: rentData.layout,
        });
      } else if (compareList.cities.length === 3) {
        let firstCity = compareList.cities[compareList.cities.length - 3];
        let secondCity = compareList.cities[compareList.cities.length - 2];
        const request = await axios.get(
          `/rent_viz/${firstCity[0]}_${firstCity[1]}?city2=${secondCity[0]}&statecode2=${secondCity[1]}&city3=${lastCityAdded[0]}&statecode3=${lastCityAdded[1]}`
        );
        const rentData = JSON.parse(request.data);
        setThisCityData({
          cityData: rentData.data,
          cityLayout: rentData.layout,
        });
      }
      setSearching({
        ...searching,
        rent: false,
      });
    }
    fetchRentData();
  }, [lastState, lastCity, lastCityAdded, compareList.cities]);
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
      const res = JSON.parse(request.data);
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
  // retrieves the ---RENTAL PREDICT--- viz graph from the DS API
  // useEffect(() => {
  //   // For search bar loading
  //   setSearching({
  //     ...searching,
  //     rentpredict: true,
  //   });
  //   async function fetchRentalPredictViz() {
  //     if (compareList.cities.length === 1) {
  //       const request = await axios.get(
  //         `/rental/predict/viz/${lastCity}_${lastState}`
  //       );
  //       const rentPredict = JSON.parse(request.data);
  //       setRentPredict({
  //         rentPredictData: rentPredict.data,
  //         rentPredictLayout: rentPredict.layout,
  //       });
  //     }
  //     setSearching({
  //       ...searching,
  //       rentpredict: false,
  //     });
  //   }
  //   fetchRentalPredictViz();
  // }, [lastCity, lastState, lastCityAdded, compareList.cities]);

  // retrieves the BLS viz view chart graph viz from DS API

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
        <div className="walkData" key={cityNumber}>
          <h3>Walkscore</h3>
          <p className="walkscore-num">{cityNumber.walkability}</p>
          <WalkscoreInfo walk={walkCityData} setWalk={setWalkCityData} />
        </div>,
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
  getTempsToSetClass(city1, 1);
  getTempsToSetClass(city2, 2);
  getTempsToSetClass(city3, 3);
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
                hideCity(e);
              }}
            >
              x
            </button>
          </div>
          <WalkData walk={{ walkFill, number }} />
          <WeatherPlot weather={{ weatherFill, number }} />
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
    let copyWeather1 = weatherCityData.cityWeather1;
    let copyWeather2 = weatherCityData.cityWeather2;
    let copyWeather3 = weatherCityData.cityWeather3;
    let copyWalk1 = walkCityData.cityWalk1;
    let copyWalk2 = walkCityData.cityWalk2;
    let copyWalk3 = walkCityData.cityWalk3;
    const length = compareList.cities.length;
    // if 3 cities are being compared
    if (length === 3) {
      // if btn user clicked matches btn id
      if (id === 'btn1') {
        // // remove city from compareList
        delete weatherCityData.cityWeather3;
        delete walkCityData.cityWalk3;
        setWeatherCityData({
          cityWeather1: weatherCityData.cityWeather2,
          cityWeather2: copyWeather3,
        });
        setWalkCityData({
          cityWalk1: walkCityData.cityWalk2,
          cityWalk2: copyWalk3,
        });
        compareList.cities = compareList.cities.slice(1);
      } else if (id === 'btn2') {
        delete weatherCityData.cityWeather2;
        delete walkCityData.cityWalk2;
        setWeatherCityData({
          cityWeather1: weatherCityData.cityWeather1,
          cityWeather2: copyWeather3,
        });
        setWalkCityData({
          cityWalk1: walkCityData.cityWalk1,
          cityWalk2: copyWalk3,
        });
        compareList.cities = [compareList.cities[0], compareList.cities[2]];
      } else if (id === 'btn3') {
        compareList.cities.pop();
        setWalkCityData({
          ...walkCityData,
          cityWalk3: undefined,
        });
        setWeatherCityData({
          ...weatherCityData,
          cityWeather3: undefined,
        });
      }
      // if 2 cities are being compared
    } else if (length === 2) {
      // copy weather/walk data to be set as city1 data
      if (id === 'btn1') {
        // // updating cityweather/walk to replace old city1 data
        setWeatherCityData({
          cityWeather1: copyWeather2,
        });
        setWalkCityData({
          cityWalk1: copyWalk2,
        });
        // copying data that will be deleted upon state update
        let lastCityState = compareList.cities[1];
        // // setting compareList cities array to be city not clicked on
        setCompareList({
          cities: [lastCityState],
          searched: true,
        });
      } else if (id === 'btn2') {
        let firstCityState = compareList.cities[0];
        setWeatherCityData({
          cityweather1: copyWeather1,
        });
        setWalkCityData({
          cityWalk1: copyWalk1,
        });
        setCompareList({
          cities: [firstCityState],
        });
      }
      // if 1 city is being compared
    } else if (length === 1) {
      if (id === 'btn1') {
        // remove city and set state back to static component
        compareList.cities.shift();
        setWeatherCityData({});
        setWalkCityData({});
        setCompareList({
          cities: [],
          searched: false,
        });
      }
    }
    setSearching({
      rent: false,
      unemployment: false,
      walkability: false,
      weather: false,
    });
    setSearching({
      rent: false,
      unemployment: false,
      walkability: false,
      weather: false,
    });
  }
  return (
    <section>
      <div className="vizs">
        <RentPlot thisCityData={thisCityData} />
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
      />
      <div className="weathers">
        {dynamicMainData(city1, 0)}
        {dynamicMainData(city2, 1)}
        {dynamicMainData(city3, 2)}
      </div>
    </section>
  );
}
