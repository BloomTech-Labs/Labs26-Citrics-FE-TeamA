import React from 'react';
import Loader from '../../../common/Loader';
export default function WeatherPlot(props) {
  return (
    <>
      {!props.weather.weatherFill[props.weather.number] ? (
        <Loader />
      ) : (
        props.weather.weatherFill[props.weather.number]
      )}
    </>
  );
}
