import React, { useEffect } from 'react';
import axios from '../../../../api/dsapi';
import Loader from '../../../common/Loader';

export default function JobIndustryViz({
  searching,
  lastCityState,
  compareList,
  jobTable,
}) {
  let jobFill = jobTable.jobFill;
  let jobIndustry = jobTable.jobIndustry;
  let setJobIndustry = jobTable.setJobIndustry;
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
      let filler = jobIndustry;
      filler.push(jobIndustryInfo);
      setJobIndustry(filler);
    }
    fetchJobIndustry();
  }, [
    lastCityState.lastCity,
    lastCityState.lastState,
    lastCityState.lastCityAdded,
    compareList,
  ]);
  function dynamicJobFill(index) {
    if (index in jobIndustry) {
      jobFill[index] = [
        <div className="jobSubViz" key={index}>
          {jobIndustry[index] && (
            <div className="jobInfo">
              <h6>
                Job Industry for {compareList[index] && compareList[index][0]}
              </h6>
              <p>Hourly Wage</p>
              <p>Annual Wage</p>
            </div>
          )}
          {jobIndustry[index] &&
            jobIndustry[index].map((value, index) => {
              return (
                <div className="jobInfo" key={index}>
                  <h6>
                    {value.occ_title
                      .replace('Technicians', 'Techs')
                      .replace(/Representatives/g, 'Reps')
                      .replace(/Computer/g, 'Comp.')
                      .replace(/Developers/g, 'Devs')}
                  </h6>
                  <p>
                    $
                    {value.hourly_wage > 0
                      ? value.hourly_wage.toFixed(2)
                      : (value.annual_wage / 2080).toFixed(2)}
                  </p>{' '}
                  <p>${value.annual_wage.toLocaleString('en-US')}</p>{' '}
                </div>
              );
            })}
        </div>,
      ];
    }
  }
  if (compareList.length === 1) {
    dynamicJobFill(jobIndustry, 0);
    jobIndustry.length > 1 && setJobIndustry([jobIndustry[0]]);
  }

  compareList.length === 2 &&
    jobIndustry.length > 2 &&
    setJobIndustry(jobIndustry.slice(0, 2));
  compareList.length === 2 && dynamicJobFill(jobIndustry, 1);
  compareList.length === 3 && dynamicJobFill(jobIndustry, 2);
  return jobFill[0] || jobFill[1] ? (
    <div className="jobViz">
      {jobFill[0] && compareList.length >= 1 && jobFill[0]}
      {jobFill[1] && compareList.length >= 2 && jobFill[1]}
      {jobFill[2] && compareList.length >= 3 && jobFill[2]}

      {/* {dynamicJobViz(jobTable.jobVizData, jobTable.jobVizLayout)} */}
    </div>
  ) : (
    // eslint-disable-next-line semi
    <Loader />
  );
}
