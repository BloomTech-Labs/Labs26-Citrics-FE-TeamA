import axios from 'axios';

export function reportWalkData(city, state) {
  return axios
    .get(`https://ds.citrics.dev/walkability/${city}_${state}`)
    .then(res => {
      // console.log('WALK ENDPOINT DATA', res.data);
      return JSON.parse(res.data);
    })
    .catch(err => {
      console.log('WALK ERR', err);
      return err;
    });
}

export function reportWeatherData(city, state) {
  return axios
    .get(`https://ds.citrics.dev/current/${city}_${state}`)
    .then(res => {
      // console.log('WEATHER ENDPOINT DATA', res.data);
      return JSON.parse(res.data);
    })
    .catch(err => {
      console.log('WEATHER ERR', err);
      return err;
    });
}

export function reportRentData(city, state) {
  return axios
    .get(`https://ds.citrics.dev/rent_viz/${city}_${state}`)
    .then(response => {
      // console.log('RENT ENDPOINT DATA', response.data);
      return JSON.parse(response.data);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}
