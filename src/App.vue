<template>
  <v-app >
    <Navbar />
    <v-content class="primary">
      <router-view></router-view>
      <ModalError :dialog="dialog" @close-dialog="closeDialog"/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import ModalError from "@/components/ModalError"
import { getLocationFromPosition } from "@/api/weatherApi";
export default {
  name: "App",
  components: {
    Navbar,
    ModalError
  },
  mounted() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.setTheLocationFromUserPosition,//sucess callback
        this.setTheLocationToCityDefault//failed callback
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
    },
    closeDialog(){
      this.$store.dispatch("setViewDialog", false);
    }
  },
  computed:{
    dialog(){
      return this.$store.getters.viewDialog
    }
  },
  data: () => ({
    //
  })
};
</script>
