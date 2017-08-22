import { gql } from 'react-apollo';

export default gql`
{
getOrders {
      _id
      text
      createdAt
      favoriteCount
      client {
        username
        avatar
        firstname
        lastname
      }
    }
  }
`;
