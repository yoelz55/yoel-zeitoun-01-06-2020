<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">{{city.CityName}}</v-list-item-title>
        <v-list-item-subtitle>{{city.WeatherText}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col class="display-1" cols="6">
          {{temperature}}
        </v-col>
        <v-col cols="6">
          <v-img
            :src="weatherPic"
            alt="Sunny image"
            width="300"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>
    </v-card>
</template>

<script>
export default {
  props:{
    city: Object,
    weatherPic: String
  },
  methods:{
  },
  computed:{
    temperature(){
      const temp = this.$store.getters.isCelsius ? this.city.Temperature.Metric : this.city.Temperature.Imperial;
      const degreeSymbol = String.fromCharCode(176);
      return `${temp.Value}${degreeSymbol}${temp.Unit}`
    }
  }
}
</script>