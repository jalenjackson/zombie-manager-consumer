import { atom } from 'recoil';
import { Zombie } from '../../utils/commonInterfaces';

export interface LocationState {
    addNewLocationModalVisibility: boolean
    addNewZombieModalVisibility: boolean
    addNewZombieLocationID: string | null
    zombiesSelected: Array<Zombie>
}

export const locationStateAtom = atom<LocationState>({
   key: 'location',
    default: {
        addNewLocationModalVisibility: false,
        addNewZombieModalVisibility: false,
        addNewZombieLocationID: null,
        zombiesSelected: []
    }
});