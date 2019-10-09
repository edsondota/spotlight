<template>
  <div>
    <header>
      <h1>
        Spotlight
        <small>Upcoming Movies list</small>
      </h1>
    </header>
    <section class="search-wrapper">
      <div class="search-wrapper__input">
        <input
        v-model="internalSearch">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Search',

  props: {
    onChange: Function,
    searchText: String,
  },

  data() {
    return {
      movies: [],
      movie: null,
      showNoResults: false,
      showAutoComplete: false,
      internalSearch: this.searchText,
    };
  },

  watch: {
    internalSearch() {
      this.onChange(this.internalSearch);
    },

    searchText() {
      this.internalSearch = this.searchText;
    },
  },
};
</script>

<style lang="scss" scoped>
  header {
    height: 60px;
    background-color: #E26740;
    color: white;

    h1 {
      padding: 10px;
      small {
        font-size: .8em;
        font-weight: normal;
      }
    }
  }

  .search-wrapper {
    margin: 20px auto;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    &__input {
      flex: 1;
      input {
        width: 100%;
        height: 2em;
        padding-left: 1em;
        border: 1px solid #4DA8A2;
      }
    }
  }
</style>
