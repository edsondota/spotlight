const axios = require('axios');
const moment = require('moment');
const db = require('./database');

require('dotenv').config();

db.init();

const API_KEY = process.env.TMDB_API_KEY;
const URL_BASE = 'https://api.themoviedb.org/3';

const getUpcomingMovies = (page) => {
  const action = '/movie/upcoming';
  return axios.get(`${URL_BASE}${action}?api_key=${API_KEY}&language=en-US&page=${page}`);
};

module.exports = {
  genre({ id }) {
    return db.getGenre(id)
      .then(genre => genre);
  },

  genres() {
    return db.getGenres()
      .then(genres => genres);
  },

  async genresByMovieId(id) {
    return db.getGenreByMovieId(id)
      .then(genres => genres);
  },

  upcomingMovies({ search }) {
    this.cacheResults();
    return db.getMovieByTitle(search)
      .then((movies) => {
        movies.forEach(async (movie) => {
          movie.genres = this.genresByMovieId(movie.id);
        });
        return movies;
      });
  },

  upcomingMovie({ id }) {
    return db.getMovie(id)
      .then(movie => db.getGenreByMovieId(id)
        .then(genres => ({ ...movie, genres })));
  },

  async cacheResults() {
    db.getLastUpdate()
      .then(async (lastUpdate) => {
        const { last_update } = lastUpdate;
        const days = moment().diff(moment(last_update), 'days');
        if (days > 1) {
          db.deleteData();
          let action = '/genre/movie/list';
          await axios.get(`${URL_BASE}${action}?api_key=${API_KEY}&language=en-US`)
            .then((res) => {
              res.data.genres.forEach(genre => db.insertGenre({ genre }));
            });

          action = '/movie/upcoming';
          await axios.get(`${URL_BASE}${action}?api_key=${API_KEY}&language=en-US&page=1`)
            .then((res) => {
              Array(res.data.total_pages).fill().map(async (_, i) => {
                const page = i + 1;
                await getUpcomingMovies(page)
                  .then((results) => {
                    results.data.results.forEach((movie) => {
                      db.insertMovie({ movie });
                    });
                  });
                return true;
              });
            });
          db.updateInfo();
        }
      });
  },
};
