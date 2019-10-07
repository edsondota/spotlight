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
    </section>
    <ul>
      <li v-for="movie in movies" v-bind:key="movie.id">
        {{ movie.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

export default {
  name: 'Search',

  data() {
    return {
      searchText: '',
      movies: null,
    }
  },

  methods: {
    searchMovie: function () {
      axios.post('http://localhost:3000/graphql', {
        query: `{
                  upcomingMovies ( search: "${this.searchText}") {
                    id,
                    title,
                    overview,
                    release_date,
                    genres {
                      id,
                      name
                    }
                  }
              }`,
      }).then((res) => {
        console.log(res.data);
        Vue.set(this, 'movies', res.data.data.upcomingMovies);
      });
    },
  },

  watch: {
    searchText: function () {
    }
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
  }
</style>
