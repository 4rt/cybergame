<template>
  <section id="field">
    <controls
      :gamePlaying="gamePlaying"
      @play="play"
      @stopGame="stopGame"
      @populateCells="populateCells"
      @clearCells="clearCells"
    />
    <div v-if="grid.length" id="grid">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="rows">
        <!-- TODO rename this to something else, this is actually row of cells -->
        <cell class="row" :row="row" :rowIndex="rowIndex" @updateCell="updateCell"/>
      </div>
    </div>
    <div v-else>
      Sorry, no grid - no life.
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {
  populateEmptyGrid, generateRandomCells, populateNewGeneration,
} from '@/utils/index';
import Controls from '@/components/Controls';
import Cell from '@/components/Cell';

export default {
  components: {
    Controls,
    Cell,
  },
  computed: {
    ...mapGetters(['grid']),
  },
  data() {
    return {
      gamePlaying: false,
    };
  },
  methods: {
    ...mapActions(['updateGrid', 'updateCell']),
    nextGeneration() {
      const newGeneration = populateNewGeneration(this.grid);

      this.updateGrid(newGeneration);
    },
    play() {
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
</style>
