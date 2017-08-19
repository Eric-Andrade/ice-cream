/* eslint-disable no-param-reassign */
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from '../graphql/schema'
import resolvers from '../graphql/resolvers/index'
import { decodeToken } from '../services/auth'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

async function auth(req, res, next) {
    try{
        const token = req.headers.authorization;
        if(token != null){
            const client = await decodeToken(token);
            req.client = client;
        }else{
            req.client = null;
        }
      return next(); 
    }catch(err){
        throw err;
    }
}

export default app =>{
    app
    .use(bodyParser.json())
    .use(auth)
    .use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }))
    .use('/graphql', graphqlExpress(req =>({
      schema,
      context:{client: req.client}
    })
    ));
}