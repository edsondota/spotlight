<template>
  <div>
    <div
      class="movie-details-wrapper">
      <div
        class="movie-details-wrapper__poster">
          <img :src="posterFullPath" alt="">
        </div>
      <div
        class="movie-details-wrapper__info">
          <h1>
            {{ movie.original_title }}
          </h1>
        <div
          class="movie-details-wrapper__info__genres">
          <ul>
            <li v-for="genre in movie.genres" v-bind:key="genre">
              {{ genre }}
            </li>
          </ul>
        </div>
        <p class="movie-details-wrapper__info__release_date">
          {{ movie.release_date | moment }}
        </p>
        <p class="movie-details-wrapper__info__overview">
          {{ movie.overview }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment';

export default {
  name: 'Details',
  data: () => ({
    movie: {
      popularity: 157.166,
      vote_count: 336,
      video: false,
      poster_path: '/kTQ3J8oTTKofAVLYnds2cHUz9KO.jpg',
      id: 522938,
      adult: false,
      backdrop_path: '/spYx9XQFODuqEVoPpvaJI1ksAVt.jpg',
      original_language: 'en',
      original_title: 'Rambo: Last Blood',
      genres: [
        'Action',
        'Thriller',
      ],
      title: 'Rambo: Last Blood',
      vote_average: 6.2,
      overview: `When John Rambo's niece travels to Mexico to find the father 
        that abandoned her and her mother, she finds herself in the grasps of
        Calle Mexican sex traffickers. When she doesn't return home as expected,
        John learns she's crossed into Mexico and sets out to get her back and make them pay.`,
      release_date: '2019-09-20',
    },
  }),

  computed: {
    posterFullPath() {
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    },
  },

  filters: {
    moment: date => moment(date).format('MMM Do YYYY'),
  },
};
</script>

<style lang="scss" scoped>
  .movie-details-wrapper {
    width: 80%;
    margin: 20px auto;
    display: flex;

    &__poster {
      flex: 1;

      img {
        width: 100%;
      }
    }

    &__info {
      flex: 2;
      padding: 0 0 0 20px;

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

      &__overview {
        padding-top: 10px;
      }
    }
  }
</style>
