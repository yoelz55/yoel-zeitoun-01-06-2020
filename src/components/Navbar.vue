<template>
  <nav>
    <v-app-bar app class="secondary"> 
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Herolo Weather App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon class="mr-1" router to="/">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </template>
        <span>Home</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon router to="favorite">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </template>
        <span>Tooltip</span>
      </v-tooltip>
      <v-menu bottom left >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list rounded class="secondary">
          <v-subheader>More</v-subheader>
          <v-list-item @click="changeTheme">
            <v-list-item-title>{{isDarkMode? 'Light theme': 'Dark theme'}}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeUnit">
            <v-list-item-title>{{isCelsius? 'Fahrenheit' : 'Celsius'}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>
<script>
export default {
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    changeUnit() {
      this.$store.dispatch("toggleUnit");
    }
  },
  computed: {
    isDarkMode() {
      return this.$vuetify.theme.dark;
    },
    isCelsius() {
      return this.$store.getters.isCelsius;
    }
  }
};
</script>