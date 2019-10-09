<template>
  <div class="movie-list">
    <div class="movie-list__wrapper">
      <ul>
        <li
          v-for="movie in movies"
          v-bind:key="movie.id"
          @click="showMovieDetails(movie.id)"
          v-show="showMovie(movie.original_title)">
          <div class="movie-list__item">
            <div
              class="movie-list__item__poster">
              <img :src="posterFullPath(movie.poster_path)" :alt="movie.original_title">
            </div>
            <div class="movie-list__item__info">
              <h4>
                {{ movie.original_title }}
              </h4>
              <div class="movie-list__item__info__genres">
                <ul>
                  <li v-for="genre in movie.genres" v-bind:key="genre.id">
                    {{ genre.name }}
                  </li>
                </ul>
              </div>
              <p class="movie-list__item__info__release_date">
                {{ movie.release_date | moment }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment';

export default {
  name: 'MovieList',

  props: {
    movies: Array,
    showMovieDetails: Function,
    search: String,
  },

  methods: {
    posterFullPath(posterPath) {
      if (posterPath) {
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
      }
      return 'https://placehold.it/500x750';
    },

    showMovie(title) {
      if (this.search) {
        const movieTitle = title.toLowerCase();
        return movieTitle.indexOf(this.search.toLowerCase()) !== -1;
      }
      return true;
    },
  },

  filters: {
    moment: date => moment(date).format('MMM Do YYYY'),
  },
};
</script>

<style lang="scss" scoped>
  .movie-list {
    &__wrapper {
      width: 80%;
      margin: 10px auto;

      ul li {
        list-style: none;
      }
    }

    &__item {
      display: flex;
      background-color: lighten(#F4DBA2, 15%);
      border: 1px solid #F3DBA2;
      margin-bottom: 10px;
      padding: 10px;

      &:hover {
        cursor: pointer;
        background: #F3DBA2;
      }

      &__poster {
        flex: 1;
        img {
          width: 100%;
        }
      }

      &__info {
        flex: 12;
        padding-left: 1em;

        &__genres {
          padding-top: 10px;
          ul {
            & > li {
              list-style: none;
              display: inline;
              margin-right: 1em;
              background-color: #F7CA59;
              color: white;
              font-size: .8em;
              padding: 2px 4px;
              border-radius: 3px;
            }
          }
        }

        &__release_date  {
          padding-top: 10px;
          color: #333;
        }
      }
    }
  }
</style>
