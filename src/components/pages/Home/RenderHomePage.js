import React, { useEffect, useState } from 'react';
import fetchCityData from '../../../api/cityData';

import CityReport from '../../common/CityReport';
import Title from '../Home/Title';
import AddingCities from '../../common/AddingCities';
import StaticHomePage from '../Home/StaticHomePage';

import { SearchContext } from '../../../state/contexts/ReportContext';
import { ReportContext } from '../../../state/contexts/ReportContext';

export default function RenderHomePage() {
  // state of home page. default state is StaticHomePageComp
  // useState for axios errors
  const [error, setError] = useState('');
  const [cityData, setCityData] = useState([]);
  const [compareList, setCompareList] = useState({
    cities: [],
    searched: false,
  });
  const [searching, setSearching] = useState({
    weather: false,
    rent: false,
    unemployment: false,
    walkability: false,
  });

  // An object of city data arrays
  const cityDataArr = {};

  useEffect(() => {
    getRentalData();
  }, []);
  // Rental Data from DS API
  const getRentalData = () => {
    fetchCityData()
      .then(response => {
        setCityData(response);
      })
      .catch(err => {
        setError(err.message);
      });
  };
  // For each item in cityData array, if it is not in the dicitonary cityDataArr yet, make an array for that city name
  cityData.forEach(value => {
    if (!(value.city in cityDataArr)) {
      cityDataArr[value.city] = [];
    }
    // Push each city and state name into the cityDataArr[state]
    cityDataArr[value.city].push([value.city, value.state]);
  });
  return (
    <>
      <div className="colorTitle">
        <Title />
      </div>
      {error && { error }}
      <SearchContext.Provider value={cityDataArr}>
        <ReportContext.Provider value={{ compareList, setCompareList }}>
          <AddingCities searchOptions={{ searching }} />
        </ReportContext.Provider>
      </SearchContext.Provider>
      {compareList.searched === false ? (
        <StaticHomePage />
      ) : (
        <ReportContext.Provider value={{ compareList, setCompareList }}>
          <CityReport
            compareList={compareList}
            searchOptions={{ searching, setSearching }}
          />
        </ReportContext.Provider>
      )}
    </>
  );
}
