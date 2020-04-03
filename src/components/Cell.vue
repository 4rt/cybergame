<template>
  <div>
    <div
      v-for="(cell, columnIndex) in row"
      :key="columnIndex"
      :class="['cell', {alive: grid[rowIndex][columnIndex]}]"
      @click="$emit('updateCell', {row: rowIndex, column: columnIndex})"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    row: {
      required: true,
      type: Array,
    },
    rowIndex: {
      required: true,
      type: Number,
    },
  },
  computed: {
    ...mapGetters(['grid']),
  },
};
</script>

<style lang="scss" scoped>
  .cell {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 1px;
    box-shadow: inset 0 0 1px mediumslateblue;
    transition: background-color 0.2s ease;
    cursor: cell;
    &:hover,
    &.alive {
      background-color: antiquewhite;
    }
  }
</style>
