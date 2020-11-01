import React from 'react';
import { Zombie as ZombieType } from '../../../../utils/commonInterfaces';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import Zombie from './Zombie';

interface Props {
    zombieKeyName: string
    zombieChildren: Array<ZombieType>
}

function ZombieByLocation(props: Props) {
    const [showZombies, updateShowZombies] = React.useState(false);
    const hasZombies = props.zombieChildren && props.zombieChildren && props.zombieChildren.length > 0;

    function onLocationClicked() {
        updateShowZombies(!showZombies);
    }

    function renderZombieChildren() {
        if (hasZombies) {
            return props.zombieChildren.map(zombie => {
                return (
                    <Zombie key={zombie.id} zombie={zombie}/>
                )
            })
        }
    }

    const cursorPointer = { cursor: 'pointer' };

    return (
        <div>
            {hasZombies && (showZombies ? <CaretDownOutlined style={cursorPointer} onClick={onLocationClicked} /> : <CaretRightOutlined style={cursorPointer} onClick={onLocationClicked} />)} <span style={cursorPointer} onClick={onLocationClicked}>{props.zombieKeyName}</span>
            {showZombies && (
                <div className='zombie-by-location-zombies'>
                    {renderZombieChildren()}
                </div>
            )}
        </div>
    )
}

export default ZombieByLocation;