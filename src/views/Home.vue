<template>
  <div class="home">
    <v-container>
      
      <v-autocomplete
        class="pa-3"
        v-model="searchCity"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        :color="autocompleteColor"
        hide-no-data
        label="City"
        placeholder="Start typing to Search"
        prepend-icon="mdi-magnify"
        @input="handleUserChoice"
      ></v-autocomplete>
     
      <v-layout row wrap class="justify-center">
        <v-flex xs10 sm10 md8 lg6 v-if="selectedCity">
          <CityCard :city="selectedCity" :weatherPic="buildPathForIcon(selectedCity.WeatherIcon)"></CityCard>
        </v-flex>
        
        <v-flex xs3 sm2 md3 lg3 v-if="selectedCity">
          <v-avatar class="mr-2">
            <v-icon :class="{red: isSelectedFavorite}">mdi-heart</v-icon>
          </v-avatar>
          <v-btn v-if="!isSelectedFavorite" @click="addToFavorite">Add to favorite</v-btn>
          <v-btn v-else @click="removeFromFavorite">Remove From favorite</v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="justify-center mt-4" v-if="dailyForecasts" >
        <v-flex xs11 sm10 md3 class="lg5-custom ma-3" v-for="daily in dailyForecasts" :key="daily.Date">
          <ForecastCard :dailyWeather="daily" :weatherPic="buildPathForIcon(daily.Day.Icon)"></ForecastCard>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import CityCard from '../components/cards/CityCard'
import ForecastCard from '../components/cards/ForecastCard'
import { getAutoCompleteWeather } from "../api/weatherApi";
export default {
  components:{
    CityCard,
    ForecastCard
  },
  data() {
    return {
      searchCity: null,
      entries: [],
      isLoading: false,
      search: null,
      items: []
    };
  },
  computed: {

    selectedCity() {
      return this.$store.getters.selectedCity;
    },
    dailyForecasts() {
      return this.$store.getters.dailyForecasts;
    },
    autocompleteColor(){
      return this.$vuetify.theme.dark ? 'white' : 'grey'
    },
    isSelectedFavorite() {
      const favoriteCities = this.$store.getters.favoriteCity;
      const favoriteCitiesId = favoriteCities.map(city => city.CityID);
      return favoriteCitiesId.includes(this.selectedCity.CityID);
    }
  },

  watch: {
    search() {
      // if(!this.isEnglish(this.search)){
      //   console.log('incondition')
      //   this.search = '';
      //   return;
      // }
       console.log('past')
      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      getAutoCompleteWeather(this.search).then(data => {
        this.entries = data;
        this.items = this.entries.map(e => e.LocalizedName);
        console.log(this.items);
        this.isLoading = false;
      });
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
    buildPathForIcon(iconNum){
      return require(`../assets/weather-icons/${iconNum}-s.png`)
    },
    // isEnglish(str){
    //   const english = /^[A-Za-z0-9_ ]+$/
    //   return  english.test(str);
    // },
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
      console.log(this.selectedCity)
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
    flex-basis: 16%;
    
  }
}
</style>