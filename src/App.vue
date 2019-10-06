<template>
  <div id="app">
    <Search />
    <Details />
  </div>
</template>

<script>
import Search from './components/Search.vue';
import Details from './components/Details.vue';

export default {
  components: {
    Search,
    Details,
  },
};
</script>

<style lang="scss">
  html,
  body,
  * {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
