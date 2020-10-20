import axios from 'axios';

export const URL = 'https://ds.citrics.dev/';
export const NewURL =
  'http://citrics-sjy.eba-gzpmh2ha.us-east-1.elasticbeanstalk.com/';

// Base url to make request to ds API
const instance = axios.create({
  baseURL: URL,
});

export default instance;
