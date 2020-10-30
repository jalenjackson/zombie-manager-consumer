import { gql } from '@apollo/client';

export const CREATE_NEW_LOCATION = gql`
  mutation createNewLocation($name: String!, $zombies: [ZombieInput]!) {
    createNewLocation(name: $name, zombies: $zombies) {
      id
    }
  }
`;