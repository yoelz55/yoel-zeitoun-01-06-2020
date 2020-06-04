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
        item-color='secondary'
        hide-no-data
        label="City"
        placeholder="Start typing to Search"
        prepend-icon="mdi-magnify"
        @input="handleUserChoice"
      ></v-autocomplete>

      <v-layout wrap class="justify-center align-center text-center">
        <v-flex xs10 sm10 md10 lg12 v-if="selectedCity">
          <CityCard :city="selectedCity" :weatherPic="buildPathForIcon(selectedCity.WeatherIcon)"></CityCard>
        </v-flex>

        <v-flex class="mt-4" xs10 sm10 md10 lg12 v-if="selectedCity">
          <v-avatar class="mr-2">
            <v-icon :class="{red: isSelectedFavorite}">mdi-heart</v-icon>
          </v-avatar>
          <v-btn  class="secondary" :class="[!isDarkMode? 'black--text': '']" rounded v-if="!isSelectedFavorite" @click="addToFavorite"><span>Add to favorite</span></v-btn>
          <v-btn class="secondary" :class="[!isDarkMode? 'black--text': '']" rounded v-else @click="removeFromFavorite">Remove From favorite</v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="justify-center" style="margin-top:125px" v-if="dailyForecasts">
        <v-flex
          xs9
          sm10
          md3
          class="lg5-custom ma-3"
          v-for="daily in dailyForecasts"
          :key="daily.Date"
        >
          <ForecastCard :dailyWeather="daily" :weatherPic="buildPathForIcon(daily.Day.Icon)"></ForecastCard>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import CityCard from "../components/cards/CityCard";
import ForecastCard from "../components/cards/ForecastCard";
import { getAutoCompleteWeather } from "../api/weatherApi";

export default {
  components: {
    CityCard,
    ForecastCard
  },
  data() {
    return {
      searchCity: null,
      entries: [],
      isLoading: false,
      search: null,
      items: [],
      timeId: null
    };
  },
  computed: {
    selectedCity() {
      return this.$store.getters.selectedCity;
    },
    dailyForecasts() {
      return this.$store.getters.dailyForecasts;
    },
    autocompleteColor() {
      return this.isDarkMode ? "white" : "grey";
    },
    isSelectedFavorite() {
      const favoriteCities = this.$store.getters.favoriteCity;
      const favoriteCitiesId = favoriteCities.map(city => city.CityID);
      return favoriteCitiesId.includes(this.selectedCity.CityID);
    },
    isDarkMode() {
      return this.$vuetify.theme.dark;
    },
  },

  watch: {
    search(val) {
      if (!val) return;
      if (!this.isEnglish(val)) {
        this.$nextTick(() => {
          this.search = "";
        });
      } else {
        this.debounceAutoComplete(val);
      }
    }
  },
  methods: {
    debounceAutoComplete(val) {
      clearTimeout(this.timeId);
      this.isLoading = true;
      this.timeId = setTimeout(() => {
        getAutoCompleteWeather(val).then(data => {
          this.entries = data;
          this.items = this.entries.map(e => e.LocalizedName);
          this.isLoading = false;
        }).catch(() => {
          this.$store.dispatch('setViewDialog', true);
          this.isLoading = false;
        })
        ;
      }, 300);
    },
    buildPathForIcon(iconNum) {
      return require(`../assets/weather-icons/${iconNum}-s.png`);
    },
    isEnglish(str) {
      // eslint-disable-next-line
      const englishAndSpecialCharac = /^[ a-zA-Z0-9!@#'\$%\^\&*\)\(._-]+$/g;
      return englishAndSpecialCharac.test(str);
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
    flex-basis: 16%;
  }
}
</style>