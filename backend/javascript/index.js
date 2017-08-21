/* eslint-disable no-console */
import express from 'express';
import { createServer } from 'http'
import './config/databases';
import constants from './config/constants'
import mocks from './mocks'
import middleware from './config/middleware'

const app = express();
middleware(app);
const graphqlServer = createServer(app)

// mocks().then(() =>{
  graphqlServer.listen(constants.port, err => {
    if (err) {
      console.error(`~Error running APIGraphQL on port: ${constants.port}`);
    } else {
      console.log(`APIGraphQL running on http://localhost:${constants.port}/graphiql`);
    }
  });
// })

