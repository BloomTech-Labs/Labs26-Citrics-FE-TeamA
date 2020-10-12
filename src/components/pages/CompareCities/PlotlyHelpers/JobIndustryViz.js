import React, { useEffect } from 'react';
import axios from '../../../../api/dsapi';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';

export default function JobIndustryViz({
  jobViz,
  searching,
  lastCityState,
  compareList,
  jobIndustryViz,
}) {
  useEffect(() => {
    searching.setSearching({
      ...searching,
      jobviz: true,
    });
    async function fetchJobIndustryViz() {
      const request = await axios.get(
        `/bls_viz/${lastCityState.lastCity}_${lastCityState.lastState}`
      );
      const jobViz = JSON.parse(request.data);
      if (!('jobVizData' in jobIndustryViz.jobIndustryViz)) {
        jobIndustryViz.setJobIndustryViz({
          jobVizData: jobViz.data,
          jobVizLayout: jobViz.layout,
        });
      } else if (
        'jobVizData' in jobIndustryViz.jobIndustryViz &&
        !('jobVizData2' in jobIndustryViz.jobIndustryViz) &&
        compareList.length === 2
      ) {
        jobIndustryViz.setJobIndustryViz({
          ...jobIndustryViz.jobIndustryViz,
          jobVizData2: jobViz.data,
          jobVizLayout2: jobViz.layout,
        });
      } else if (
        'jobVizData2' in jobIndustryViz.jobIndustryViz &&
        !('jobVizData3' in jobIndustryViz.jobIndustryViz) &&
        compareList.length === 3
      ) {
        jobIndustryViz.setJobIndustryViz({
          ...jobIndustryViz.jobIndustryViz,
          jobVizData3: jobViz.data,
          jobVizLayout3: jobViz.layout,
        });
      }
    }
    fetchJobIndustryViz();
  }, [
    lastCityState.lastCity,
    lastCityState.lastState,
    lastCityState.lastCityAdded,
    compareList,
  ]);

  function dynamicJobViz(data, layout) {
    if (data !== undefined) {
      return (
        <div>
          <Plot data={data} layout={layout} />
        </div>
      );
    }
  }

  return !jobViz.jobVizData ? (
    <Loader />
  ) : (
    <>
      {dynamicJobViz(jobViz.jobVizData, jobViz.jobVizLayout)}
      {dynamicJobViz(jobViz.jobVizData2, jobViz.jobVizLayout2)}
      {dynamicJobViz(jobViz.jobVizData3, jobViz.jobVizLayout3)}
    </>
    // eslint-disable-next-line semi
  );
}
