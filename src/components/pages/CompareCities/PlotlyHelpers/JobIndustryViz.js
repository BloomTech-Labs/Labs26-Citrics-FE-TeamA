import React from 'react';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';

export default function JobIndustryViz(props) {
  return !props.jobViz.jobVizData ? (
    <Loader />
  ) : (
    <>
    <div>
      <Plot data={props.jobViz.jobVizData} layout={props.jobViz.jobVizLayout} />
    </div>
    {props.jobViz.jobVizData2 !== undefined && 
    <div>
      <Plot data={props.jobViz.jobVizData2} layout={props.jobViz.jobVizLayout2} />
    </div>
    }
    {props.jobViz.jobVizData3 !== undefined && 
    <div>
      <Plot data={props.jobViz.jobVizData3} layout={props.jobViz.jobVizLayout3} />
    </div>
    }
    </>
  // eslint-disable-next-line semi
  )
}
