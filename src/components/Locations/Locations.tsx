import React from 'react';
import get from 'lodash/get';
import Location from './Location';
import { Zombie } from '../../utils/commonInterfaces';

interface Props {
    zombiesData: { data: { zombies: Array<Zombie> }, refetch: () => void }
}

function Locations(props: Props) {
    const locations = get(props, 'zombiesData.data.zombies.response');

    function renderItem() {
        return Object.keys(locations).map(keyName => {
            const zombies = locations[keyName];
            return <Location keyName={keyName} zombies={zombies} />
        })
    }

    return (
        <div>
            {renderItem()}
        </div>
    )
}

export default Locations;