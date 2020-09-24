import axios from 'axios';

export function reportWalkData(city, state) {
  return axios
    .get(`https://ds.citrics.dev/walkability/${city}_${state}`)
    .then(res => {
      return JSON.parse(res.data);
    })
    .catch(err => {
      return err;
    });
}

export function reportWeatherData(city, state) {
  return axios
    .get(`https://ds.citrics.dev/current/${city}_${state}`)
    .then(res => {
      return JSON.parse(res.data);
    })
    .catch(err => {
      return err;
    });
}

export function unemploymentData(state) {
  return axios
    .get(`https://ds.citrics.dev/viz/${state}`)
    .then(response => {
      return JSON.parse(response.data);
    })
    .catch(err => {
      return err;
    });
}
