import React from 'react';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';

export default function UnemploymentPlot(props) {
  return !('data' in props.unemployment) ? (
    // if there is no unemployment['data']
    // display a Loader
    <Loader />
  ) : (
    // else display the unemployment plot the data exists
    <Plot data={props.unemployment.data} layout={props.unemployment.layout} />
  );
}
