import axios from 'axios';

const oldURL = 'https://ds.citrics.dev/';
export const URL =
  'http://26-citrics-a-ds.eba-tjpigfip.us-east-1.elasticbeanstalk.com/';
// Base url to make request to ds API
const instance = axios.create({
  baseURL: URL,
});

export default instance;
