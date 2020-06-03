<template>
  <v-card class="mx-auto" max-width="344">
    <v-img class="mx-auto" :src="weatherPic" max-width="200px"></v-img>

    <v-card-title>{{day}}</v-card-title>
    <v-card-subtitle class="font-weight-black title">{{temperature}}</v-card-subtitle>
    <p class="pat-0 ml-2">{{date}}</p>
    <div class="ml-4 font-weight-black italic">
       {{dailyWeather.Day.IconPhrase}}
      </div>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn  icon @click="show = !show" class="mr-3">
        more
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <div @click="check">yoel</div>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    dailyWeather: Object,
    weatherPic: String
  },
  data: () => ({
    show: false
  }),
  methods: {
    check() {
      console.log(this.dailyWeather);
    },
  },
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
    temperature(){
      const temp = this.dailyWeather.Temperature;
      let tempValue = (temp.Maximum.Value + temp.Minimum.Value) / 2;
      let tempUnit = 'F';
      if(this.$store.getters.isCelsius){
        tempValue = (5/9) * (tempValue - 32);
        tempUnit = 'C';
      }
      const degreeSymbol = String.fromCharCode(176);
      return `${tempValue.toFixed(1)}${degreeSymbol}${tempUnit}`
    }
  },

};
</script>