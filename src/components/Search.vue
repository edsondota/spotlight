<template>
  <div>
    <header>
      <h1>
        Spotlight
        <small>Upcoming Movies list</small>
      </h1>
    </header>
    <section
      class="search-wrapper"
    >
      <div class="search-wrapper__input">
        <input
        v-model="searchText">
      </div>
      <div class="search-wrapper__button">
        <button
          @click="searchMovie"
        >Search</button>
      </div>
      <div class="search-wrapper__alert-no-results" v-if="showNoResults">
        No results were found for your search.
      </div>
      <ul
        v-show="movies.length > 0"
        class="search-wrapper__auto-complete">
        <li
          v-for="movie in movies"
          v-bind:key="movie.id"
          @click="selectMovie(movie.id)">
          {{ movie.original_title}}
          <em>{{ movie.release_date | moment }}</em>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import * as moment from 'moment';

const searchMovie = searchText => axios.post('http://localhost:3000/graphql', {
  query: `{
            upcomingMovies ( search: "${searchText}") {
              id,
              original_title,
              overview,
              release_date,
              genres {
                id,
                name
              }
            }
        }`,
});

export default {
  name: 'Search',

  props: {
    showMovieDetails: Function,
  },

  data() {
    return {
      searchText: '',
      movies: [],
      movie: null,
      showNoResults: false,
    };
  },

  methods: {
    searchMovie() {
      this.showNoResults = false;
      if (this.searchText.length > 2) {
        const movieResults = searchMovie(this.searchText);
        movieResults.then((res) => {
          if (res.data.data.upcomingMovies) {
            Vue.set(this, 'movies', res.data.data.upcomingMovies);
          } else {
            this.movies = [];
            this.showNoResults = true;
          }
        });
      }
    },

    selectMovie(id) {
      this.showMovieDetails(id);
      this.movies = [];
    },
  },

  watch: {
    searchText() {
      this.showNoResults = false;
      if (this.searchText.length > 2) {
        const movieResults = searchMovie(this.searchText);
        movieResults.then((res) => {
          if (res.data.data.upcomingMovies) {
            Vue.set(this, 'movies', res.data.data.upcomingMovies);
          } else {
            this.movies = [];
            this.showNoResults = true;
          }
        });
      } else {
        this.movies = [];
      }
    },
  },

  filters: {
    moment: date => moment(date).format('MMM Do YYYY'),
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
      flex: 5;
      input {
        width: 100%;
        height: 2em;
        padding-left: 1em;
        border: 1px solid #4DA8A2;
      }
    }

    &__button {
      flex: 1;
      button {
        width: 100%;
        text-align: center;
        height: 2.2em;
        background: #4DA8A2;
        color: white;
        border: 1px solid #4DA8A2;

        &:hover {
          cursor: pointer;
        }
      }
    }

    &__alert-no-results {
      flex-basis: 100%;
      font-size: .8em;
      padding-top: .8em;
    }

    &__auto-complete {
      position: absolute;
      width: 100%;
      top: 1.8em;
      flex-basis: 100%;

      li {
        list-style: none;
        background: lighten(#4DA8A2, 40%);
        border: 1px solid #4DA8A2;
        border-top-width: 0;
        padding: 5px;
        display: block;

        em {
          font-size: .8em;
        }

        &:hover {
          cursor: pointer;
        background: lighten(#4DA8A2, 30%);
        }
      }
    }
  }
</style>
