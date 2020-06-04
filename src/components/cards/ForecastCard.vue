<template>
  <v-card class="mx-auto accent" :elevation="5" max-width="344">
    <v-img class="mx-auto" :src="weatherPic" max-width="200px"></v-img>
    <v-card-title>{{day}}</v-card-title>
    <v-card-subtitle class="font-weight-black title">{{temperature}}</v-card-subtitle>
    <v-card-text>
      <p>{{date}}</p>
      <p class="font-weight-black" style="height:30px">{{dailyWeather.Day.IconPhrase}}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    dailyWeather: Object,
    weatherPic: String
  },
  data: () => ({}),
  methods: {},
  computed: {
    date() {
      const d = new Date(this.dailyWeather.Date);
      const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
      const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
      return `${da}-${mo}-${ye}`;
    },
    day() {
      const daysOfTheWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const dayNumber = new Date(this.dailyWeather.Date).getDay();
      return daysOfTheWeek[dayNumber];
    },
    //In the Forecast API, I got only the Fahren unit (max and min) so I took the average
    temperature() {
      const temp = this.dailyWeather.Temperature;
      let tempValue = (temp.Maximum.Value + temp.Minimum.Value) / 2;
      let tempUnit = "F";
      if (this.$store.getters.isCelsius) {
        tempValue = (5 / 9) * (tempValue - 32);
        tempUnit = "C";
      }
      const degreeSymbol = String.fromCharCode(176);
      return `${tempValue.toFixed(1)}${degreeSymbol}${tempUnit}`;
    }
  }
};
</script>