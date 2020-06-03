<template>
  <v-app >
    <Navbar />
    <v-content class="primary">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { getLocationFromPosition } from "@/api/weatherApi";
export default {
  name: "App",

  components: {
    Navbar
  },
  mounted() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.setTheLocationFromUserPosition,
        this.setTheLocationToCityDefault
      );
    } else {
      this.setTheLocationToCityDefault();
    }
  },
  methods: {
    setTheLocationToCityDefault() {
      const telAvivDefaultId = "215854";
      this.$store.dispatch("setCurrentWeather", {
        cityID: telAvivDefaultId,
        cityName: "Tel-Aviv"
      });
    },
    setTheLocationFromUserPosition(position) {
      getLocationFromPosition(
        position.coords.latitude,
        position.coords.longitude
      ).then(data => {
        this.$store.dispatch("setCurrentWeather", {
          cityID: data.key,
          cityName: data.LocalizedName
        });
      });
    }
  },
  data: () => ({
    //
  })
};
</script>
