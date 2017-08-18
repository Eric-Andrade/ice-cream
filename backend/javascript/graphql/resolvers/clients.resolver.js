import Client from '../../models/clients'

export default {
    signupClient: (_, { fullName, ... rest }) => {
        const [firstname, ... lastname] = fullName.split(' ');
        return Client.create({firstname, lastname, ... rest });
    }
}