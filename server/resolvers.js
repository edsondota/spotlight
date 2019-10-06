const axios = require('axios');

require('dotenv').config();

const API_KEY = process.env.TMDB_API_KEY;
const URL_BASE = 'https://api.themoviedb.org/3/genre/movie/list';

module.exports = {
  genre({ id }) {
    return axios.get(`${URL_BASE}?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        const filtered = res.data.genres.filter(genre => genre.id === id);
        if (filtered) {
          return filtered[0];
        }
        return null;
      });
  },
  genres() {
    return axios.get(`${URL_BASE}?api_key=${API_KEY}&language=en-US`)
      .then(res => res.data.genres);
  },
};
