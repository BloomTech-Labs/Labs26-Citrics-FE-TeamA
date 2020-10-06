import axios from 'axios';

export const URL = 'https://ds.citrics.dev/';
// Base url to make request to ds API
const instance = axios.create({
  baseURL: URL,
});

export default instance;
