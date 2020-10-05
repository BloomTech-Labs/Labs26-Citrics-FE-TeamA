import axios from 'axios';

export default function fetchCityData() {
  return axios
    .get(
      'http://26-citrics-a-ds.eba-tjpigfip.us-east-1.elasticbeanstalk.com/rent_city_state/'
    )
    .then(response => {
      return JSON.parse(response.data);
    })
    .catch(err => {
      console.log('Error logged', err);
    });
}
