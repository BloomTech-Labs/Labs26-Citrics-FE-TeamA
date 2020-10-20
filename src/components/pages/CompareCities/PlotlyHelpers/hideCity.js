export default function hideCity(event, hideCityOptions) {
  // Setting up variables
  let compareList = hideCityOptions.compareList;
  let setCompareList = hideCityOptions.setCompareList;
  let weatherCityData = hideCityOptions.weatherCityData;
  let setWeatherCityData = hideCityOptions.setWeatherCityData;
  let walkCityData = hideCityOptions.walkCityData;
  let setWalkCityData = hideCityOptions.setWalkCityData;
  let rentalFill = hideCityOptions.rentalFill;
  let setRentalFill = hideCityOptions.setRentalFill;
  let rentalPredictData = hideCityOptions.rentalPredictData;
  let setRentalPredictData = hideCityOptions.setRentalPredictData;
  let setSearching = hideCityOptions.setSearching;
  let jobIndustry = hideCityOptions.jobIndustry;
  let setJobIndustry = hideCityOptions.setJobIndustry;
  let jobFill = hideCityOptions.jobFill;
  let setJobFill = hideCityOptions.setJobFill;
  // id of button the user clicks
  let id = event.target.id;
  // Duplicates to keep each object item in memory for changes.
  let copyWeather1 = weatherCityData.cityWeather1;
  let copyWeather2 = weatherCityData.cityWeather2;
  let copyWeather3 = weatherCityData.cityWeather3;
  let copyWalk1 = walkCityData.cityWalk1;
  let copyWalk2 = walkCityData.cityWalk2;
  let copyWalk3 = walkCityData.cityWalk3;
  // Length of the compareList cities
  const length = compareList.cities.length;

  // if 3 cities are being compared
  if (length === 3) {
    // if btn user clicked matches btn id
    if (id === 'btn1') {
      // remove city from compareList
      delete weatherCityData.cityWeather3;
      delete walkCityData.cityWalk3;
      rentalFill[0] = rentalFill[1];
      delete rentalFill[1];
      rentalFill[1] = rentalFill[2];
      delete rentalFill[2];

      jobFill[0] = jobFill[1];
      delete jobFill[1];
      jobFill[1] = jobFill[2];
      delete jobFill[2];

      setRentalPredictData(rentalPredictData.slice(1));
      setJobIndustry(jobIndustry.slice(1));

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
      delete rentalFill[1];
      delete jobFill[1];
      setRentalPredictData([rentalPredictData[0], rentalPredictData[2]]);
      setJobIndustry([jobIndustry[0], jobIndustry[2]]);
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
      delete rentalFill[2];
      delete jobFill[2];
      setRentalPredictData(rentalPredictData.slice(0, 2));
      setJobIndustry(jobIndustry.slice(0, 2));
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
      delete rentalFill[0];
      delete jobFill[0];
      rentalPredictData[0] = rentalPredictData.pop();
      jobIndustry[0] = jobIndustry.pop();
      // setRentalPredictData([rentalPredictData[1]]);
      setWeatherCityData({
        // // updating cityweather/walk to replace old city1 data
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
      setRentalPredictData([rentalPredictData[0]]);
      setJobIndustry([jobIndustry[0]]);
      setRentalFill({});
      setJobFill({});
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
    weather: false,
    rent: false,
    unemployment: false,
    walkability: false,
    rentPredict: false,
    jobviz: false,
    weatherPredictViz: false,
  });
}
