import React from 'react';
import Loader from '../../../common/Loader';
export default function WeatherPlot(props) {
  return (
    <>
      {!props.props.weatherFill[props.props.number] ? (
        <Loader />
      ) : (
        props.props.weatherFill[props.props.number]
      )}
    </>
  );
}
