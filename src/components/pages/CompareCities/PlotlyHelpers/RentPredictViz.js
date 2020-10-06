import React from 'react';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';

export default function RentPredictViz(props) {
  return !props.rentPredictViz.rentPredictData ? (
    <Loader />
  ) : (
    <Plot
      data={props.rentPredictViz.rentPredictData}
      layout={props.rentPredictViz.rentPredictLayout}
    />
  );
}
