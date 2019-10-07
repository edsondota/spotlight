const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Genre {
    id: Int
    name: String
  }
  type UpcomingMovie {
    id: ID
    original_title: String
    title: String
    overview: String
    release_date: String
    genres: [Genre]
    poster_path: String
    backdrop_path: String

  }
  type Query {
    genres: [Genre]
    genre(id: Int): Genre
    upcomingMovies(search: String): [UpcomingMovie]
    upcomingMovie(id: Int): UpcomingMovie
  }
`);
