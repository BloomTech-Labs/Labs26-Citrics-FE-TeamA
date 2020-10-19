import axios from 'axios';
import { NewURL } from './dsapi';
export default function fetchCityData() {
  return axios
    .get(NewURL + 'rent_city_state/')
    .then(response => {
      return JSON.parse(response.data);
    })
    .catch(err => {
      console.log('Error logged', err);
    });
}
