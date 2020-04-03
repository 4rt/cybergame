<template>
  <main id="app">
    <game />
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import { populateEmptyGrid } from '@/utils/index';
import Game from '@/components/Game';

export default {
  components: {
    Game,
  },
  methods: {
    ...mapActions(['updateGrid']),
  },
  beforeMount() {
    this.updateGrid(populateEmptyGrid());
  },
};
</script>

<style>
  html,
  body {
    width: 100%;
    height: 100%;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    background-color: mediumslateblue;
    font-family: "Courier New", sans-serif;
  }
</style>
