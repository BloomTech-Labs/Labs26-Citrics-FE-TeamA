import React, { useEffect } from 'react';
import axios from '../../../../api/dsapi';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';

export default function WeatherPredictViz({
  weatherPrediction,
  compareList,
  lastCityState,
  searching,
}) {
  // Set up setWeatherPredict from state so it is not a long string in the code below
  const setWeatherPredict = weatherPrediction.setWeatherPredict;
  useEffect(() => {
    // For search bar loading knowledge
    searching.setSearching({
      ...searching.searching,
      weatherPredictViz: true,
    });
    // Async axios call to set weatherPredict
    async function fetchWeatherPredict() {
      // Checks the length of compareList cities length to know which link to pull data from DS API.
      if (compareList.length === 1) {
        const request = await axios.get(
          `/weather/predict/viz/${lastCityState.lastCity}_${lastCityState.lastState}`
        );
        const weatherPredictData = JSON.parse(request.data);
        setWeatherPredict({
          weatherPredictionData: weatherPredictData.data,
          weatherPredictionLayout: weatherPredictData.layout,
        });
      } else if (compareList.length === 2) {
        let firstCity = compareList[compareList.length - 2];
        const request = await axios.get(
          `/weather/predict/viz/${firstCity[0]}_${firstCity[1]}?city2=${lastCityState.lastCityAdded[0]}&state2=${lastCityState.lastCityAdded[1]}`
        );
        const weatherPredictData = JSON.parse(request.data);
        setWeatherPredict({
          weatherPredictionData: weatherPredictData.data,
          weatherPredictionLayout: weatherPredictData.layout,
        });
      } else if (compareList.length === 3) {
        let firstCity = compareList[compareList.length - 3];
        let secondCity = compareList[compareList.length - 2];
        const request = await axios.get(
          `/weather/predict/viz/${firstCity[0]}_${firstCity[1]}?city2=${secondCity[0]}&state2=${secondCity[1]}&city3=${lastCityState.lastCityAdded[0]}&state3=${lastCityState.lastCityAdded[1]}`
        );
        const weatherPredictData = JSON.parse(request.data);
        setWeatherPredict({
          weatherPredictionData: weatherPredictData.data,
          weatherPredictionLayout: weatherPredictData.layout,
        });
      }
      searching.setSearching({
        ...searching.searching,
        weatherPredictViz: false,
      });
    }
    fetchWeatherPredict();
  }, [
    lastCityState.lastState,
    lastCityState.lastCity,
    lastCityState.lastCityAdded,
    compareList,
  ]);
  // set up from state to not have long strings
  const weatherPredictRes = weatherPrediction.weatherPredict;
  // If weatherPredicitonRes has weatherPredictData, return the plot
  return weatherPredictRes.weatherPredictionData ? (
    <div className="weatherPlotViz">
      <Plot
        data={weatherPredictRes.weatherPredictionData}
        layout={weatherPredictRes.weatherPredictionLayout}
      />
    </div>
  ) : (
    // Else display a loader
    <Loader />
  );
}
