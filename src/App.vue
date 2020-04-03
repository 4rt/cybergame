<template>
  <main id="app">
    <game-field />
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import { populateEmptyGrid } from '@/utils/index';
import GameField from '@/components/GameField';

export default {
  components: {
    GameField,
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
  }
</style>
