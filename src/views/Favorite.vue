<template>
  <div class="favorite">
    <v-container>
      <v-layout row  class="justify-center" >
          <v-flex  @click="onSelectFavorite(city.CityID, city.CityName)" class= "ma-4" xs10 sm10 md4 lg3 v-for="city in favoriteCities" :key="city.cityID" >
            <CityCard :weatherPic="buildPathForIcon(city.WeatherIcon)"  :city="city"></CityCard>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import CityCard from '../components/cards/CityCard'
export default {
  components:{
    CityCard
  },
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
    buildPathForIcon(iconNum){
      return require(`../assets/weather-icons/${iconNum}-s.png`)
    },
  }
}
</script>