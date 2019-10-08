<template>
  <div id="app">
    <Search
      v-bind:showMovieDetails="showMovieDetails"
    />
    <Details
      v-if="movie"
      v-bind:movie="movie || {}" />
  </div>
</template>

<script>
import axios from 'axios';
import Search from './components/Search.vue';
import Details from './components/Details.vue';

export default {
  components: {
    Search,
    Details,
  },

  data: () => ({
    movie: null,
  }),

  methods: {
    showMovieDetails(id) {
      this.movie = null;
      axios.post('http://localhost:3000/graphql', {
        query: `{
                  upcomingMovie ( id: ${id}) {
                    id,
                    original_title,
                    overview,
                    release_date,
                    poster_path,
                    backdrop_path,
                    genres {
                      id,
                      name
                    }
                  }
              }`,
      }).then((res) => {
        this.movie = res.data.data.upcomingMovie;
      });
    },
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
