import axios from 'axios';

const baseUrl = 'http://dataservice.accuweather.com/';
const apiKey = '1VYLh2RXTjJTk5CNYYRGIGBthGmOKA0O';

export function getAutoCompleteWeather(text) {
  console.log(text)
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
  // return [
  //   {
  //     "Version": 1,
  //     "Key": "215613",
  //     "Type": "City",
  //     "Rank": 45,
  //     "LocalizedName": "Ashdod",
  //     "Country": {
  //       "ID": "IL",
  //       "LocalizedName": "Israel"
  //     },
  //     "AdministrativeArea": {
  //       "ID": "D",
  //       "LocalizedName": "Southern District"
  //     }
  //   },
  //   {
  //     "Version": 1,
  //     "Key": "3554509",
  //     "Type": "City",
  //     "Rank": 85,
  //     "LocalizedName": "Ashdown Island",
  //     "Country": {
  //       "ID": "CA",
  //       "LocalizedName": "Canada"
  //     },
  //     "AdministrativeArea": {
  //       "ID": "BC",
  //       "LocalizedName": "British Columbia"
  //     }
  //   },
  //   {
  //     "Version": 1,
  //     "Key": "717302",
  //     "Type": "City",
  //     "Rank": 85,
  //     "LocalizedName": "Ashdon",
  //     "Country": {
  //       "ID": "GB",
  //       "LocalizedName": "United Kingdom"
  //     },
  //     "AdministrativeArea": {
  //       "ID": "ESS",
  //       "LocalizedName": "Essex"
  //     }
  //   },
  //   {
  //     "Version": 1,
  //     "Key": "331849",
  //     "Type": "City",
  //     "Rank": 85,
  //     "LocalizedName": "Ashdown",
  //     "Country": {
  //       "ID": "US",
  //       "LocalizedName": "United States"
  //     },
  //     "AdministrativeArea": {
  //       "ID": "AR",
  //       "LocalizedName": "Arkansas"
  //     }
  //   }
  // ]
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
  console.log('cityID', cityID)
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