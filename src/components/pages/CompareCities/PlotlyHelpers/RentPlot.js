import React, { useEffect } from 'react';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';
import axios from '../../../../api/dsapi';

export default function RentPlot(props) {
  // seting up variables from props
  let searching = props.rentPlotOptions.searching;
  let setSearching = props.rentPlotOptions.setSearching;
  let compareList = props.rentPlotOptions.compareList;
  let lastCity = props.rentPlotOptions.lastCity;
  let lastState = props.rentPlotOptions.lastState;
  let lastCityAdded = props.rentPlotOptions.lastCityAdded;
  let setThisCityData = props.rentPlotOptions.setThisCityData;
  // useEffect for fetching ---RENT--- data viz from ds backend
  // sets the cityData and cityLayout for following cities into thisCityData
  useEffect(() => {
    // For search bar loading knowledge
    setSearching({
      ...searching,
      rent: true,
    });
    // Async axios call to set rentData
    async function fetchRentData() {
      // Checks the length of compareList cities length to know which link to pull data from DS API.
      if (compareList.cities.length === 1) {
        const request = await axios.get(`/rent_viz/${lastCity}_${lastState}`);
        const rentData = JSON.parse(request.data);
        setThisCityData({
          cityData: rentData.data,
          cityLayout: rentData.layout,
        });
      } else if (compareList.cities.length === 2) {
        let firstCity = compareList.cities[compareList.cities.length - 2];
        const request = await axios.get(
          `/rent_viz/${firstCity[0]}_${firstCity[1]}?city2=${lastCityAdded[0]}&statecode2=${lastCityAdded[1]}`
        );
        const rentData = JSON.parse(request.data);
        setThisCityData({
          cityData: rentData.data,
          cityLayout: rentData.layout,
        });
      } else if (compareList.cities.length === 3) {
        let firstCity = compareList.cities[compareList.cities.length - 3];
        let secondCity = compareList.cities[compareList.cities.length - 2];
        const request = await axios.get(
          `/rent_viz/${firstCity[0]}_${firstCity[1]}?city2=${secondCity[0]}&statecode2=${secondCity[1]}&city3=${lastCityAdded[0]}&statecode3=${lastCityAdded[1]}`
        );
        const rentData = JSON.parse(request.data);
        setThisCityData({
          cityData: rentData.data,
          cityLayout: rentData.layout,
        });
      }
      setSearching({
        ...searching,
        rent: false,
      });
    }
    fetchRentData();
  }, [lastState, lastCity, lastCityAdded, compareList.cities]);

  // If there is no cityData in thisCityData
  return !props.thisCityData.cityData ? (
    // return a loader
    <Loader />
  ) : (
    // else return the plot data
    <div className="rentPlotViz">
      <Plot
        data={props.thisCityData.cityData}
        layout={props.thisCityData.cityLayout}
      />
    </div>
  );
}
