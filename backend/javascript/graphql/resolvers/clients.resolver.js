/* eslint-disable no-console */
import Client from '../../models/clients'
import { requireAuth } from '../../services/auth'

export default {
    signupClient: async (_, { fullName, ... rest }) => {
        try{
            const [firstname, ... lastname] = fullName.split(' ');
            const client = await Client.create({firstname, lastname, ... rest });
    
            return { token: client.createToken(), }
        }catch(error){
            throw error
        }
    },
    loginClient: async(_, {email, password}) => {
        try{
            const client = await Client.findOne({ email });

            if(!client){
                throw new Error(`Email ${email} is incorrect, maybe you want to sign up`)
            }if(!client.authenticateClient(password)){
                throw new Error(`Sorry, password not match. Try again`)
            }

            return { token: client.createToken(), };
        }catch(error){
            throw error
        }
    },
    me: async (_, args, {client}) =>{
        try{
            const me = await requireAuth(client)
            return me;
            
        }catch(error){
            throw error;
        }
    }
}