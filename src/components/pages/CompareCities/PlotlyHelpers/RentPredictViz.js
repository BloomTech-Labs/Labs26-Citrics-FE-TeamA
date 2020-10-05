import React from 'react';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';

export default function RentPredictViz(props) {
  console.log('THIS IS PROPS', props);
  return (
    <div>
      <Plot
        data={props.rentPredictViz.rentPredictData}
        layout={props.rentPredictViz.rentPredictLayout}
      />
    </div>
  );
}
