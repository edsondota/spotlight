const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Genre {
    id: Int
    name: String
  }
  type UpcomingMovie {
    id: ID
    title: String
    overview: String
    release_date: String
    genres: [Genre]
  }
  type Query {
    genres: [Genre]
    genre(id: Int): Genre
    upcomingMovies(search: String): [UpcomingMovie]
    upcomingMovie(id: Int): UpcomingMovie
  }
`);
