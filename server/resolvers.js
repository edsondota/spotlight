const axios = require('axios');

require('dotenv').config();

const API_KEY = process.env.TMDB_API_KEY;
const URL_BASE = 'https://api.themoviedb.org/3';

const getGenreByIds = (ids) => {
  const action = '/genre/movie/list';
  return axios.get(`${URL_BASE}${action}?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      const filtered = res.data.genres.filter(genre => ids.some(id => genre.id === id));
      if (filtered) {
        return filtered;
      }
      return null;
    });
};

module.exports = {
  genre({ id }) {
    const action = '/genre/movie/list';
    return axios.get(`${URL_BASE}${action}?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        const filtered = res.data.genres.filter(genre => genre.id === id);
        if (filtered) return filtered[0];

        return null;
      });
  },
  genres() {
    const action = '/genre/movie/list';
    return axios.get(`${URL_BASE}${action}?api_key=${API_KEY}&language=en-US`)
      .then(res => res.data.genres);
  },
  upcomingMovies({ search }) {
    const action = '/movie/upcoming';
    return axios.get(`${URL_BASE}${action}?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => {
        const movies = res.data.results;
        movies.genres = [];
        movies.forEach((movie, index) => {
          movies[index].genres = getGenreByIds(movie.genre_ids);
        });
        return movies.filter(movie => movie.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);
      });
  },
  upcomingMovie({ id }) {
    const action = `/movie/${id}`;
    return axios.get(`${URL_BASE}${action}?api_key=${API_KEY}&language=en-US}`)
      .then(res => res.data);
  },
};
