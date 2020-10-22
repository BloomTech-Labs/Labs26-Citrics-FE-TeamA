import React from 'react';
import Loader from '../../../common/Loader';
export default function WeatherPlot(props) {
  return (
    <>
      {!props.weather.weatherFill[props.weather.number] ? ( // if the weatherFill[index] does not exist
        // display a Loader
        <Loader />
      ) : (
        // else display the weatherFill if the index exists
        props.weather.weatherFill[props.weather.number]
      )}
    </>
  );
}
