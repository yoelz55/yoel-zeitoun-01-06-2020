import axios from 'axios';

const baseUrl = 'http://dataservice.accuweather.com/';
const apiKey = '1VYLh2RXTjJTk5CNYYRGIGBthGmOKA0O';

export function getAutoCompleteWeather(text) {
  return new Promise(function (resolve, reject) {
    const URL = `${baseUrl}locations/v1/cities/autocomplete?apikey=${apiKey}&q=${text}&language=en-us`;
    axios.
      get(URL)
      .then(res => {
        return res.data
      })
      .then(data => {
        return resolve(data);
      })
      .catch(err => reject(err))
  });
}

const telAvivDefaultId = '215854';
export function getCurrentWeather(cityID = telAvivDefaultId, cityName) {
  return new Promise(function (resolve, reject) {
    const URL = `${baseUrl}currentconditions/v1/${cityID}?apikey=${apiKey}`;
    axios.
      get(URL)
      .then(res => {
        return res.data
      })
      .then(data => {
        data[0].CityID = cityID;
        data[0].CityName = cityName;
        return resolve(data[0]);
      })
      .catch(err => reject(err))
  });
}
export function get5DaysForecastsWeather(cityID = telAvivDefaultId, cityName) {
  return new Promise(function (resolve, reject) {
    const URL = `${baseUrl}forecasts/v1/daily/5day/${cityID}?apikey=${apiKey}`;
    axios.
      get(URL)
      .then(res => {
        return res.data.DailyForecasts
      })
      .then(data => {
        data.forEach(element => {
          element.CityID = cityID;
          element.CityName = cityName;
        })
        return resolve(data);
      })
      .catch(err => reject(err))
  });
}

export function getLocationFromPosition(lat, lon) {
  return new Promise(function (resolve, reject) {
    const URL = `${baseUrl}locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lon}`;
    axios.
      get(URL)
      .then(res => {
        return res.data
      })
      .then(data => {
        return resolve(data);
      })
      .catch(err => reject(err))
  });
}