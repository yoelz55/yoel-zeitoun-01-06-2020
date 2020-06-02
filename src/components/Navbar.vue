<template>
<nav>
  <v-app-bar app flat>
    <v-toolbar-title class="text-uppercase grey--text">
      <span class="font-weight-light">Herolo Weather App</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="mr-1" router to="/">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn router to="favorite">
        <span>Favorite</span>
        <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn @click="changeTheme">
        <span>Theme</span>
    </v-btn>
    
   </v-app-bar>
</nav>
</template>
<script>
export default {
  methods:{
    changeTheme(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
}
</script>