import React from 'react';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';

export default function RentPredictViz(props) {
  return !props.rentPredictViz.rentPredictData ? ( // if there is no rentPredictData in rentPredictViz
    // display a Loader
    <Loader />
  ) : (
    // else display the rent predict plot the data exists
    <Plot
      data={props.rentPredictViz.rentPredictData}
      layout={props.rentPredictViz.rentPredictLayout}
    />
  );
}
