import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    grid: [],
  },
  getters: {
    grid: state => state.grid,
  },
  actions: {
    updateGrid({ commit }, payload) {
      commit('updateGrid', payload);
    },
    updateCell({ commit }, payload) {
      commit('updateCell', payload);
    },
  },
  mutations: {
    updateGrid: (state, grid) => {
      state.grid = grid;
    },
    updateCell: (state, { row, column }) => {
      const clone = [...state.grid];
      clone[row][column] = +(!clone[row][column]);
      state.grid = clone;
    },
  },
});
