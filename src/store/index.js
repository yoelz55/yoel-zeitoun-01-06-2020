import Vue from 'vue'
import Vuex from 'vuex'
import { getCurrentWeather } from "../api/weatherApi";
import { get5DaysForecastsWeather } from "../api/weatherApi";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favoriteCity: [],
    selectedCity: null,
    dailyForecasts: null,
    isCelsius: true,
    viewDialog: false
  },
  getters: {
    favoriteCity: state => {
      return state.favoriteCity;
    },
    selectedCity: state => {
      return state.selectedCity;
    },
    dailyForecasts: state => {
      return state.dailyForecasts;
    },
    isCelsius: state => {
      return state.isCelsius;
    },
    viewDialog: state => {
      return state.viewDialog
    }
  },
  mutations: {
    addFavoriteCity(state, cityToAdd) {
      state.favoriteCity.push(cityToAdd);
    },
    removeFromFavorite(state, cityToRemove) {
      state.favoriteCity = state.favoriteCity.filter(city => city.CityID != cityToRemove.CityID);
    },
    setSelectedCity(state, selectedCity) {
      state.selectedCity = selectedCity;
    },
    setForecast(state, dailyForecasts) {
      state.dailyForecasts = dailyForecasts;
    },
    toggleUnit(state) {
      state.isCelsius = !state.isCelsius;
    },
    setViewDialog(state, viewDialog) {
      state.viewDialog = viewDialog;
    }
  },
  actions: {
    toggleUnit({ commit }) {
      commit('toggleUnit');
    },
    setViewDialog({ commit }, viewDialog) {
      commit('setViewDialog', viewDialog);
    },
    setSelectedCity({ commit }, selectedCity) {
      commit('setSelectedCity', selectedCity);
    },
    addFavoriteCity({ commit }, cityToAdd) {
      commit('addFavoriteCity', cityToAdd);
    },
    removeFromFavorite({ commit }, cityToRemove) {
      commit('removeFromFavorite', cityToRemove);
    },
    async setCurrentWeather({ dispatch, commit }, { cityID, cityName }) {
      try {
        commit('setSelectedCity', await getCurrentWeather(cityID, cityName));
        dispatch('setCityForecast', { cityID, cityName });
      }
      catch (error) {
        dispatch('setViewDialog', true)
      }
    },
    async setCityForecast({ dispatch, commit }, { cityID, cityName }) {
      try {
        commit('setForecast', await get5DaysForecastsWeather(cityID, cityName));
      }
      catch (error) {
        dispatch('setViewDialog', true)
      }
    },
  },
})
