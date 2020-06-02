<template>
  <div class="favorite">
    <v-layout row wrap class="justify-center" >
        <v-flex xs10 sm6 md4 lg3 v-for="city in favoriteCities" :key="city.cityID" >
          <v-card  flat class="yellow text-xs-center ma-4" @click="onSelectFavorite(city.CityID, city.CityName)">
            <v-card-text >
              <div class="subheading">{{city.WeatherText}}</div>
              <div class="grey--text">{{city.CityName}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
    </v-layout>
  </div>
</template>


<script>
export default {
  data(){
    return {
    }
  },
  computed:{
    favoriteCities(){
      return  this.$store.getters.favoriteCity
    }
  },

  methods:{
    onSelectFavorite(cityID, cityName){
      this.$store.dispatch('setCurrentWeather', {cityID: cityID, cityName: cityName})
      this.$router.go(-1)
    },
  }
}
</script>