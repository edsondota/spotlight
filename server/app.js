const app = require('express')();
const expressGraphQL = require('express-graphql');
const schema = require('./schema');
const resolvers = require('./resolvers');

require('dotenv').config();

app.use('/graphql', expressGraphQL({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express listening on port 3000');
});
