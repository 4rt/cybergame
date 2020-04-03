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

<style scoped>

</style>
