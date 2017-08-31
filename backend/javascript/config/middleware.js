/* eslint-disable no-param-reassign */
import bodyParser from 'body-parser';
import { decodeToken } from '../services/auth'

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
}