import axios from 'axios';

export function fetchCityPlot(cityName) {
  return axios
    .get(`https://ds.citrics.dev/rent_viz/${cityName}`)
    .then(response => {
      // console.log(JSON.parse(response.data));

      return JSON.parse(response.data);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}
