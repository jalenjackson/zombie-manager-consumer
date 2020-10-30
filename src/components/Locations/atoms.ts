import { atom } from 'recoil';
import { Zombie } from '../../utils/commonInterfaces';

export interface LocationState {
    addNewLocationModalVisibility: boolean
    zombiesSelected: Array<Zombie>
}

export const locationStateAtom = atom<LocationState>({
   key: 'location',
    default: {
        addNewLocationModalVisibility: false,
        zombiesSelected: []
    }
});