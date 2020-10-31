import { gql } from '@apollo/client';

export const CREATE_NEW_LOCATION = gql`
  mutation createNewLocation($name: String!, $zombies: [ZombieInput]!) {
    createNewLocation(name: $name, zombies: $zombies) {
      id
    }
  }
`;

export const MOVE_ZOMBIE_TO_LOCATION = gql`
  mutation moveZombieToLocation($locationID: ID!, $zombieID: ID!) {
    moveZombieToLocation(locationID: $locationID, zombieID: $zombieID) {
        id
      }
    }  
`;

export const CREATE_NEW_ZOMBIE = gql`
  mutation createNewZombie($name: String!, $locationID: ID!) {
    createNewZombie(name: $name, locationID: $locationID) {
        id
      }
    }  
`;

