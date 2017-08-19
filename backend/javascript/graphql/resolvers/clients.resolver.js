/* eslint-disable no-console */
import Client from '../../models/clients'

export default {
    signupClient: (_, { fullName, ... rest }) => {
        const [firstname, ... lastname] = fullName.split(' ');
        return Client.create({firstname, lastname, ... rest });
    },
    loginClient: async(_, {email, password}) => {
        const client = await Client.findOne({ email });
        if(!client){
            throw new Error(`Client not exists`)
        }
        if(!client.authenticateClient(password)){
            throw new Error(`Sorry, password not match. Try again`)
        }
        return client
    }
}