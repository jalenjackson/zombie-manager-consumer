export interface Location {
    id: string,
    name: string,
    zombies: Array<Zombie>
}

export interface Zombie {
    id: string
    name: string
    location: string
}