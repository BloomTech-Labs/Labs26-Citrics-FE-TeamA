import React from 'react';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';

export default function UnemploymentPlot(props) {
  return !('data' in props.unemployment) ? (
    <Loader />
  ) : (
    <Plot data={props.unemployment.data} layout={props.unemployment.layout} />
  );
}
