<template>
  <div class="home">
    <v-container>
      <v-autocomplete
        v-model="searchCity"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        label="Public APIs"
        placeholder="Start typing to Search"
        prepend-icon="mdi-database-search"
        @input="handleUserChoice"
      ></v-autocomplete>

      <v-layout row wrap class="justify-center">
        <v-flex xs6 sm6 md6 lg6>
          <v-card v-if="selectedCity" flat class="yellow text-xs-center ma-4">
            <v-card-text>
              <div>{{selectedCity.CityName}}</div>
              <div>{{favoriteNumber}}</div>
              <div class="subheading">{{selectedCity.WeatherText}}</div>
              <div class="grey--text">{{selectedCity.EpochTime}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex></v-flex>
        <v-flex xs3 sm3 md3 lg3 v-if="selectedCity">
          <v-avatar class="mr-2">
            <v-icon :class="{red: isSelectedFavorite}">mdi-heart</v-icon>
          </v-avatar>
          <v-btn v-if="!isSelectedFavorite" @click="addToFavorite">Add to favorite</v-btn>
          <v-btn v-else @click="removeFromFavorite">Remove From favorite</v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap v-if="dailyForecasts" class="mt-4">
        <v-flex xs12 sm6 md4 class="lg5-custom" v-for="daily in dailyForecasts" :key="daily.Date">
          <v-card flat class="red text-xs-center ma-3">
            <v-card-text>
              <div class="subheading">{{daily.Date}}</div>
              <div class="grey--text">{{daily.Day.IconPhrase}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
//import { getAutoCompleteWeather } from "../api/weatherApi";
export default {
  data() {
    return {
      searchCity: null,
      entries: [],
      isLoading: false,
      search: null,
      items: [],
      selectedCityName: "Tel-Aviv"
    };
  },
  computed: {
    selectedCity() {
      return this.$store.getters.selectedCity;
      //   return {
      //   CityID: '215854',
      //   LocalObservationDateTime: "2020-06-02T10:06:00+03:00",
      //   EpochTime: 1591081560,
      //   WeatherText: "Mostly cloudy",
      //   WeatherIcon: 6,
      //   HasPrecipitation: false,
      //   PrecipitationType: null,
      //   IsDayTime: true,
      //   Temperature: {
      //     Metric: {
      //       Value: 28.3,
      //       Unit: "C",
      //       UnitType: 17
      //     },
      //     Imperial: {
      //       Value: 83,
      //       Unit: "F",
      //       UnitType: 18
      //     }
      //   },
      //   MobileLink:
      //     "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
      //   Link:
      //     "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
      // };
    },
    dailyForecasts() {
      return this.$store.getters.dailyForecasts;

      //     return [{
      //     "Date": "2020-06-02T07:00:00+03:00",
      //     "EpochDate": 1591070400,
      //     "Temperature": {
      //       "Minimum": {
      //         "Value": 66,
      //         "Unit": "F",
      //         "UnitType": 18
      //       },
      //       "Maximum": {
      //         "Value": 85,
      //         "Unit": "F",
      //         "UnitType": 18
      //       }
      //     },
      //     "Day": {
      //       "Icon": 1,
      //       "IconPhrase": "Sunny",
      //       "HasPrecipitation": false
      //     },
      //     "Night": {
      //       "Icon": 35,
      //       "IconPhrase": "Partly cloudy",
      //       "HasPrecipitation": false
      //     },
      //     "Sources": [
      //       "AccuWeather"
      //     ],
      //     "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
      //     "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
      //   },
      //   {
      //     "Date": "2020-06-03T07:00:00+03:00",
      //     "EpochDate": 1591156800,
      //     "Temperature": {
      //       "Minimum": {
      //         "Value": 62,
      //         "Unit": "F",
      //         "UnitType": 18
      //       },
      //       "Maximum": {
      //         "Value": 78,
      //         "Unit": "F",
      //         "UnitType": 18
      //       }
      //     },
      //     "Day": {
      //       "Icon": 1,
      //       "IconPhrase": "Sunny",
      //       "HasPrecipitation": false
      //     },
      //     "Night": {
      //       "Icon": 34,
      //       "IconPhrase": "Mostly clear",
      //       "HasPrecipitation": false
      //     },
      //     "Sources": [
      //       "AccuWeather"
      //     ],
      //     "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
      //     "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
      //   },
      //   {
      //     "Date": "2020-06-04T07:00:00+03:00",
      //     "EpochDate": 1591243200,
      //     "Temperature": {
      //       "Minimum": {
      //         "Value": 67,
      //         "Unit": "F",
      //         "UnitType": 18
      //       },
      //       "Maximum": {
      //         "Value": 83,
      //         "Unit": "F",
      //         "UnitType": 18
      //       }
      //     },
      //     "Day": {
      //       "Icon": 1,
      //       "IconPhrase": "Sunny",
      //       "HasPrecipitation": false
      //     },
      //     "Night": {
      //       "Icon": 33,
      //       "IconPhrase": "Clear",
      //       "HasPrecipitation": false
      //     },
      //     "Sources": [
      //       "AccuWeather"
      //     ],
      //     "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
      //     "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
      //   },
      //   {
      //     "Date": "2020-06-05T07:00:00+03:00",
      //     "EpochDate": 1591329600,
      //     "Temperature": {
      //       "Minimum": {
      //         "Value": 64,
      //         "Unit": "F",
      //         "UnitType": 18
      //       },
      //       "Maximum": {
      //         "Value": 82,
      //         "Unit": "F",
      //         "UnitType": 18
      //       }
      //     },
      //     "Day": {
      //       "Icon": 1,
      //       "IconPhrase": "Sunny",
      //       "HasPrecipitation": false
      //     },
      //     "Night": {
      //       "Icon": 33,
      //       "IconPhrase": "Clear",
      //       "HasPrecipitation": false
      //     },
      //     "Sources": [
      //       "AccuWeather"
      //     ],
      //     "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
      //     "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
      //   },
      //   {
      //     "Date": "2020-06-06T07:00:00+03:00",
      //     "EpochDate": 1591416000,
      //     "Temperature": {
      //       "Minimum": {
      //         "Value": 65,
      //         "Unit": "F",
      //         "UnitType": 18
      //       },
      //       "Maximum": {
      //         "Value": 82,
      //         "Unit": "F",
      //         "UnitType": 18
      //       }
      //     },
      //     "Day": {
      //       "Icon": 1,
      //       "IconPhrase": "Sunny",
      //       "HasPrecipitation": false
      //     },
      //     "Night": {
      //       "Icon": 33,
      //       "IconPhrase": "Clear",
      //       "HasPrecipitation": false
      //     },
      //     "Sources": [
      //       "AccuWeather"
      //     ],
      //     "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
      //     "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
      //   }
      // ]
    },
    favoriteNumber() {
      return this.$store.getters.favoriteCity.length;
    },
    isSelectedFavorite() {
      const favoriteCities = this.$store.getters.favoriteCity;
      const favoriteCitiesId = favoriteCities.map(city => city.CityID);
      return favoriteCitiesId.includes(this.selectedCity.CityID);
    }
  },

  watch: {
    search() {
      if(!this.isEnglish(this.search)){
        console.log('incondition')
        this.search = '';
        
        return;
      }
       console.log('past')
      // // Items have already been requested
      // if (this.isLoading) return;

      // this.isLoading = true;

      // getAutoCompleteWeather(this.search).then(data => {
      //   this.entries = data;
      //   this.items = this.entries.map(e => e.LocalizedName);
      //   console.log(this.items);
      //   this.isLoading = false;
      // });
      // setTimeout(() => {
      //   this.entries = [
      //     {
      //       Version: 1,
      //       Key: "215613",
      //       Type: "City",
      //       Rank: 45,
      //       LocalizedName: "Ashdod",
      //       Country: {
      //         ID: "IL",
      //         LocalizedName: "Israel"
      //       },
      //       AdministrativeArea: {
      //         ID: "D",
      //         LocalizedName: "Southern District"
      //       }
      //     },
      //     {
      //       Version: 1,
      //       Key: "3554509",
      //       Type: "City",
      //       Rank: 85,
      //       LocalizedName: "Ashdown Island",
      //       Country: {
      //         ID: "CA",
      //         LocalizedName: "Canada"
      //       },
      //       AdministrativeArea: {
      //         ID: "BC",
      //         LocalizedName: "British Columbia"
      //       }
      //     },
      //     {
      //       Version: 1,
      //       Key: "717302",
      //       Type: "City",
      //       Rank: 85,
      //       LocalizedName: "Ashdon",
      //       Country: {
      //         ID: "GB",
      //         LocalizedName: "United Kingdom"
      //       },
      //       AdministrativeArea: {
      //         ID: "ESS",
      //         LocalizedName: "Essex"
      //       }
      //     },
      //     {
      //       Version: 1,
      //       Key: "331849",
      //       Type: "City",
      //       Rank: 85,
      //       LocalizedName: "Ashdown",
      //       Country: {
      //         ID: "US",
      //         LocalizedName: "United States"
      //       },
      //       AdministrativeArea: {
      //         ID: "AR",
      //         LocalizedName: "Arkansas"
      //       }
      //     }
      //   ]
      //   this.items = this.entries.map(e => e.LocalizedName);
      //   console.log(this.items);
      //   this.isLoading = false;
      // }, 500);
    }
  },
  methods: {
    isEnglish(str){
      const english = /^[A-Za-z0-9_ ]+$/
      return  english.test(str);
    },
    handleUserChoice(name) {
      const cityName = name;
      let cityID = "";
      this.entries.forEach(entry => {
        if (entry.LocalizedName == cityName) cityID = entry.Key;
      });
      this.$store.dispatch("setCurrentWeather", {
        cityID: cityID,
        cityName: cityName
      });
    },
    addToFavorite() {
      this.$store.dispatch("addFavoriteCity", this.selectedCity);
    },
    removeFromFavorite() {
      this.$store.dispatch("removeFromFavorite", this.selectedCity);
    }
  }
};
</script>





<style >
@media (min-width: 1264px) and (max-width: 3000px) {
  .flex.lg5-custom {
    width: 20%;
    max-width: 20%;
    flex-basis: 20%;
  }
}
</style>