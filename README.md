## Get Started

1. Make sure you are on node version v12.19.0
2. Make sure the graphql node server is running before starting
3. Run yarn && yarn start

Tech Stack:
TypeScript, @apollo/client & graphql (querying the gql server), Recoil (local state management)

I normally use Redux, Redux-Saga, and Immutabale for state management, but in this case since most data is fetched and changes through the graaphql server and the in memory cache with apollo client, we dont need to use redux at all. 

Features:

- You can create new locations
- See how many zombies are in each location
- When creating a new location, you can move zombies to the new location at the same time you are creating it
- You can move zombies to any location by dragging and dropping
- You can delete any location
- You can create new zombies
- You can delete any zombie

**Zombie Manager**
![Alt text](/public/images/start.png?raw=true "Zombie Manager")

**Move Zombies To Another Location**
![Alt text](/public/images/drag.png?raw=true "Drag and Drop")

**Create A New Location**
![Alt text](/public/images/newLocation.png?raw=true "Create New Location")

**Delete A Zombie**
![Alt text](/public/images/deleteZombie.png?raw=true "Delete Zombie")

**Create A New Zombie**
![Alt text](/public/images/newZombie.png?raw=true "New Zombie")
