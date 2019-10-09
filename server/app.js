const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const path = require('path');
const schema = require('./schema');
const resolvers = require('./resolvers');

require('dotenv').config();

const app = express();

app.use(cors());

resolvers.cacheResults();

app.use('/', express.static(path.join(__dirname, '../dist')));

app.use('/graphql', expressGraphQL({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express listening on port 3000');
});
