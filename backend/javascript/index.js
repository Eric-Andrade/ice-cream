/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { createServer } from 'http'
import './config/databases';
import  typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers/index'
import constants from './config/constants'
import mocks from './mocks'

const app = express();
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app
  .use(bodyParser.json())
  .use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))
  .use('/graphql', graphqlExpress({
    schema
  }
  ))
const graphqlServer = createServer(app)

mocks().then(() =>{
  graphqlServer.listen(constants.port, err => {
    if (err) {
      console.error(`~Error running APIGraphQL on port: ${constants.port}`);
    } else {
      console.log(`APIGraphQL running on port: ${constants.port}`);
    }
  });
})

