import axios from 'axios';

export default function fetchCityData() {
  return axios
    .get('https://ds.citrics.dev/rent_city_state/')
    .then(response => {
      return JSON.parse(response.data);
    })
    .catch(err => {
      console.log('Error logged', err);
    });
}
