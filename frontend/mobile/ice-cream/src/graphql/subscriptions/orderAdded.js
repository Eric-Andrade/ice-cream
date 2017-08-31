import { gql } from 'react-apollo';

export default gql`
   subscription {
        orderAdded {
            _id
            text
            favoriteCount
            createdAt
            client{
                username
                firstname
                lastname
                avatar
            }
        }
   }
`;
