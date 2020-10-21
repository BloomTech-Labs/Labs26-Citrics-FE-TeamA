import axios from 'axios';
import { URL } from './dsapi';

export default function fetchCityData() {
  // fetches city, state names for AutoComplete.js
  return axios
    .get(URL + 'rent_city_state/')
    .then(response => {
      return JSON.parse(response.data);
    })
    .catch(err => {
      console.log('Error logged', err);
    });
}
