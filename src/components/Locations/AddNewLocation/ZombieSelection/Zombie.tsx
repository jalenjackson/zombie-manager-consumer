import React from 'react';
import clone from 'lodash/clone';
import alterRecoilState from '../../../../utils/alterRecoilState';
import { Zombie as ZombieType } from '../../../../utils/commonInterfaces';
import { useRecoilState } from 'recoil';
import { locationStateAtom, LocationState } from '../../atoms';

interface Props {
    zombie: ZombieType
}

function Zombie(props: Props) {
    const [locationState, setLocationState] = useRecoilState<LocationState>(locationStateAtom);
    const zombieFoundIndex = locationState.zombiesSelected.findIndex(zombie => zombie.id === props.zombie.id);

    function onZombieClicked(zombie: ZombieType) {
        const tmpZombiesSelected: Array<ZombieType> = clone(locationState.zombiesSelected);

        if (zombieFoundIndex !== -1) {
            tmpZombiesSelected.splice(zombieFoundIndex, 1);
            return alterRecoilState(setLocationState, { zombiesSelected: tmpZombiesSelected });
        } else {
            tmpZombiesSelected.push(zombie);
            return alterRecoilState(setLocationState, { zombiesSelected: tmpZombiesSelected });
        }
    }

    return (
        <div onClick={() => onZombieClicked(props.zombie)}>
            {props.zombie.name} {zombieFoundIndex !== -1 && <span>Selected</span>}
        </div>
    )
}

export default Zombie;