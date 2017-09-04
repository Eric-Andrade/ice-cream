/* eslint-disable no-console */
import express from 'express';
import { createServer } from 'http';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import './config/databases';
import constants from './config/constants'
import mocks from './mocks'
import middleware from './config/middleware'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers/index'

const app = express();
middleware(app);
app
  .use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${constants.port}${constants.subscriptionPath}`
  }))
  .use('/graphql', graphqlExpress(req =>({
    schema,
    context:{client: req.client}
  })
  ));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
const graphqlServer = createServer(app)

// mocks().then(() =>{
  graphqlServer.listen(constants.port, err => {
    if (err) {
      console.error(`~Error running APIGraphQL on port: ${constants.port}`);
    } else {
      new SubscriptionServer({// eslint-disable-line
        schema,
        execute,
        subscribe
      },{
        server: graphqlServer,
        path: constants.subscriptionPath
      })
      console.log(`APIGraphQL running on http://localhost:${constants.port}/graphql`);
    }
  });
// })

