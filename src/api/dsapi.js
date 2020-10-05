import axios from 'axios';

// Base url to make request to ds API
const instance = axios.create({
  baseURL:
    'http://26-citrics-a-ds.eba-tjpigfip.us-east-1.elasticbeanstalk.com/',
});

export default instance;
