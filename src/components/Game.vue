<template>
  <section id="field">
    <controls
      :gamePlaying="gamePlaying"
      @play="play"
      @stopGame="stopGame"
      @populateCells="populateCells"
      @clearCells="clearCells"
    />
    <div v-if="validGrid" id="grid">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="rows">
        <cell-row class="row" :row="row" :rowIndex="rowIndex" @updateCell="updateCell"/>
      </div>
    </div>
    <div v-else>
      <h2>Sorry, no grid - no life.</h2>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {
  populateEmptyGrid, generateRandomCells, populateNewGeneration,
} from '@/utils/index';
import Controls from '@/components/Controls';
import CellRow from '@/components/CellRow';

export default {
  components: {
    Controls,
    CellRow,
  },
  data() {
    return {
      gamePlaying: false,
    };
  },
  computed: {
    ...mapGetters(['grid']),
    validGrid() {
      return this.grid.length && this.grid[0].length;
    },
  },
  methods: {
    ...mapActions(['updateGrid', 'updateCell']),
    nextGeneration() {
      const newGeneration = populateNewGeneration(this.grid);

      this.updateGrid(newGeneration);
    },
    play() {
      if (!this.grid.length) return;

      this.gamePlaying = setInterval(() => {
        this.nextGeneration();
      }, 100);
    },
    stopGame() {
      clearInterval(this.gamePlaying);
      this.gamePlaying = false;
    },
    populateCells() {
      this.updateGrid(generateRandomCells());
    },
    clearCells() {
      this.stopGame();
      this.updateGrid(populateEmptyGrid());
    },
  },
  beforeDestroy() {
    this.stopGame();
  },
};
</script>

<style lang="scss" scoped>
#field {
  text-align: center;
}

#grid {
  box-shadow: 0 20px 50px rgb(98, 77, 226);
}

.row {
  display: flex;
}

h2 {
  color: indigo;
}
</style>
