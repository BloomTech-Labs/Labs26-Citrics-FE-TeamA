import React from 'react';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';

export default function JobIndustryViz(props) {
  return !props.jobViz.jobVizData ? (
    <Loader />
  ) : (
    <div>
      <Plot data={props.jobViz.jobVizData} layout={props.jobViz.jobVizLayout} />
    </div>
  );
}
