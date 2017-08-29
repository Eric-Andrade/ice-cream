import { gql } from 'react-apollo';

export default gql`
    mutation createOrder($text: String!){
        createOrder(text: $text){
            _id
            text
            favoriteCount
            createdAt
            client{
                avatar
                username
                firstname
                lastname
            }
        }
    }
`;
