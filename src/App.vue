<template>
  <div id="app">
    <Search />
  </div>
</template>

<script>
import Search from './components/Search.vue';

export default {
  components: {
    Search,
  },
};
</script>

<style lang="scss">
  html,
  body,
  * {
    margin: 0;
    padding: 0;
  }
</style>
