import { gql } from 'react-apollo';

export default gql`
    {
        me{
            username
            firstName
            lastName
            avatar
        }
    }
`;