import React, { useState, useEffect } from 'react';
import axios from '../../../../api/dsapi';
import Loader from '../../../common/Loader';

export default function JobIndustryViz({
  searching,
  lastCityState,
  compareList,
  jobTable,
}) {
  useEffect(() => {
    searching.setSearching({
      ...searching,
      jobviz: true,
    });
    async function fetchJobIndustry() {
      const request = await axios.get(
        `/bls_jobs/${lastCityState.lastCity}_${lastCityState.lastState}`
      );
      const jobIndustryInfo = JSON.parse(request.data);
      function firstFive(arr) {
        let items = arr.slice(0, 5).map(job => {
          return job;
        });
        return items;
      }
      console.log(firstFive(jobIndustryInfo), 'first 5 invoked');
      if (!('occ1' in jobTable.jobIndustry)) {
        jobTable.setJobIndustry({
          occ1: jobIndustryInfo[0].occ_title,
          ann_wage: jobIndustryInfo[0].annual_wage,
          hr_wage: jobIndustryInfo[0].hourly_wage,
        });
      }
      // else if (
      //   'jobVizData' in jobIndustryViz.jobIndustryViz &&
      //   !('jobVizData2' in jobIndustryViz.jobIndustryViz) &&
      //   compareList.length === 2
      // ) {
      //   jobIndustryViz.setJobIndustryViz({
      //     ...jobIndustryViz.jobIndustryViz,
      //     jobVizData2: jobViz.data,
      //     jobVizLayout2: jobViz.layout,
      //   });
      // } else if (
      //   'jobVizData2' in jobIndustryViz.jobIndustryViz &&
      //   !('jobVizData3' in jobIndustryViz.jobIndustryViz) &&
      //   compareList.length === 3
      // ) {
      //   jobIndustryViz.setJobIndustryViz({
      //     ...jobIndustryViz.jobIndustryViz,
      //     jobVizData3: jobViz.data,
      //     jobVizLayout3: jobViz.layout,
      //   });
      // }
    }
    fetchJobIndustry();
  }, [
    lastCityState.lastCity,
    lastCityState.lastState,
    lastCityState.lastCityAdded,
    compareList,
  ]);
  console.log(jobTable.jobIndustry);
  function dynamicJobViz(data, layout) {
    if (data !== undefined) {
      return <div></div>;
    }
  }

  return !jobTable.jobVizData ? (
    <Loader />
  ) : (
    <div className="jobViz">
      {dynamicJobViz(jobTable.jobVizData, jobTable.jobVizLayout)}
    </div>
    // eslint-disable-next-line semi
  );
}
