import { gql } from '@apollo/client';

export const GET_LOCATIONS = gql`
    query GetLocation {
        locations {
            id
            name
            zombies {
                id
                name
            }
        }
    }   
`;

export const GET_LOCATION = gql`
    query GetLocation($id: ID!) {
        location(id: $id) {
            id
            name
            zombies {
                id
                name
            }
        }
    }
`;

export const GET_ZOMBIES = gql`
    {
      zombies {
        response
      }
    }  
`;