import axios from 'axios';

export const URL = 'https://ds.citrics.dev/';
export const NewURL =
  'https://a-ds.citrics.dev/';

// Base url to make request to ds API
const instance = axios.create({
  baseURL: NewURL,
});

export default instance;
