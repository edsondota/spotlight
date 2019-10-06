const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Genre {
    id: Int
    name: String
  }
  type UpcomingMovie {
    id: ID
    title: String
    genres: [Genre]
    overview: String
    release_date: String
  }
  type Query {
    genres: [Genre]
    genre(id: Int): Genre
  }
`);
