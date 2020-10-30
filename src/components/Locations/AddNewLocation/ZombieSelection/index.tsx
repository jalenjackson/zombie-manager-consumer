import React from 'react';
import { Zombie } from '../../../../utils/commonInterfaces';
import ZombieByLocation from './ZombieByLocation';

interface Props {
    zombiesData: {[key: string]: Array<Zombie>}
}

function ZombieSelection(props: Props) {
    const { zombiesData } = props;

    function renderZombiesByLocation() {
        return Object.keys(zombiesData).map((zombieKeyName: string) => {
            const zombieChildren = zombiesData[zombieKeyName];

            return (
                <ZombieByLocation key={zombieKeyName} zombieKeyName={zombieKeyName} zombieChildren={zombieChildren} />
            )
        })
    }

    return (
        <div>
            {renderZombiesByLocation()}
        </div>
    )
}

export default ZombieSelection;