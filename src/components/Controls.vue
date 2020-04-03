<template>
  <header>
    <button
      v-if="!gamePlaying"
      type="button"
      @click="$emit('play')"
    >
      Play
    </button>
    <button
      v-else
      type="button"
      @click="$emit('stopGame')"
    >
      Stop
    </button>
    <button
      type="button"
      @click="$emit('populateCells')"
    >
      Populate
    </button>
    <button
      type="button"
      @click="$emit('clearCells')"
    >
      Clear
    </button>
  </header>
</template>

<script>
export default {
  props: {
    gamePlaying: {
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  background-color: white;
  border: none;
  margin: 0;
  padding: 5px 10px;
  transition: background-color 0.2s ease;
  cursor: pointer;
  font-family: inherit;
  &:hover,
  &:active {
    background-color: gainsboro;
  }
  &:focus {
    outline: none;
    box-shadow: inset 0 0 2px gainsboro;
  }
}
</style>
