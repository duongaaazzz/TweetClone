import { gql } from 'react-apollo';

export default gql`
    subscription {
        tweetAdded{
            _id
            text
            createdAt
            favoriteCount
            user {
                username
                avatar
                lastName
                firstName
            }
        }
    }
`;
