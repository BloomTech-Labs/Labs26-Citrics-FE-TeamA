import axios from 'axios';

export default function fetchCityData() {
  return axios
    .get('https://ds.citrics.dev/rent_city_state/')
    .then(response => {
      // console.log(JSON.parse(response.data));
      return JSON.parse(response.data);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}
