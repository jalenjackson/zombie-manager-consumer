import { atom } from 'recoil';

export interface LocationState {
    addNewLocationModalVisibility: boolean
}

export const locationStateAtom = atom<LocationState>({
   key: 'location',
    default: {
        addNewLocationModalVisibility: false
    }
});