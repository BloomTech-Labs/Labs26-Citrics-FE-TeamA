import axios from 'axios';

// Base url to make request to ds API
const instance = axios.create({
  baseURL: 'https://ds.citrics.dev/',
});

export default instance;
