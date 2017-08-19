import jwt from 'jsonwebtoken'
import constants from '../config/constants';
import Client from '../models/clients'

export async function requireAuth(client){
    if(!client || !client._id){
        throw new Error('Unathorized');
    }
    const me = await Client.findById(client._id);

    if(!me){
        throw new Error('Unathorized'); 
    }
    return me;
}

export function decodeToken(token){
    const arr = token.split(' ');
    if(arr[0] === 'Bearer'){
        return jwt.verify(arr[1], constants.jwt_secret)
    }
    throw new Error(`Token not valid`)
} 