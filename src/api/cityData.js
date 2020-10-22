import axios from './dsapi';

export default async function fetchCityData() {
  // fetches city, state names for AutoComplete.js
  const request = await axios.get('/rent_city_state/');
  return JSON.parse(request.data);
}
fetchCityData();
