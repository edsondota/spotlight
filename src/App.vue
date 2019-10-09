<template>
  <div id="app">
    <Search
      v-bind:onChange="onChange"
      v-bind:searchText="search"
    />
    <MovieList
      v-bind:showMovieDetails="showMovieDetails"
      v-bind:movies="movies"
      v-bind:search="search"
      v-bind:movie="movie"
      v-if="!movie"
    />
    <Details
      v-if="movie"
      v-bind:searchReturn="() => movie = null"
      v-bind:movie="movie || {}" />
  </div>
</template>

<script>
import axios from 'axios';
import Search from './components/Search.vue';
import Details from './components/Details.vue';
import MovieList from './components/MovieList.vue';

const BASE_URL = process.env.VUE_APP_API_URL;

export default {
  components: {
    Search,
    Details,
    MovieList,
  },

  data: () => ({
    movie: null,
    allMovies: [],
    movies: [],
    search: '',
  }),

  created() {
    axios.post(`${BASE_URL}/graphql`, {
      query: `{
                upcomingMovies (search: "") {
                  id,
                  original_title,
                  poster_path,
                  release_date,
                  genres {
                    id,
                    name
                  }
                }
              }`,
    }).then((res) => {
      this.allMovies = res.data.data.upcomingMovies;
      this.movies = this.allMovies;
    });
  },

  methods: {
    showMovieDetails(id) {
      this.search = '';
      this.movie = null;
      axios.post(`${BASE_URL}/graphql`, {
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

    onChange(search) {
      this.movie = null;
      this.search = search;
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
