import React from 'react';
import { Zombie as ZombieType } from '../../../../utils/commonInterfaces';
import Zombie from './Zombie';

interface Props {
    zombieKeyName: string
    zombieChildren: Array<ZombieType>
}

function ZombieByLocation(props: Props) {
    const [showZombies, updateShowZombies] = React.useState(false);

    function onLocationClicked() {
        updateShowZombies(!showZombies);
    }

    function renderZombieChildren(zombieChildren: Array<ZombieType>) {
        if (zombieChildren && zombieChildren.length > 0) {
            return zombieChildren.map(zombie => {
                return (
                    <Zombie key={zombie.id} zombie={zombie}/>
                )
            })
        } else {
            return (
                <span>No Zombies</span>
            )
        }
    }

    return (
        <div>
            <span onClick={onLocationClicked}>{props.zombieKeyName}</span>
            {showZombies && renderZombieChildren(props.zombieChildren)}
        </div>
    )
}

export default ZombieByLocation;