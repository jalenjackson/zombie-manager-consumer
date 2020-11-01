import React from 'react';
import get from 'lodash/get';
import Location from './Location';
import Row from 'antd/lib/row';
import { Zombie } from '../../utils/commonInterfaces';

interface Props {
    zombiesData: { data: { zombies: Array<Zombie> }, refetch: () => void }
}

function Locations(props: Props) {
    const locations = get(props, 'zombiesData.data.zombies.response');

    function renderFreeZombies() {
        const keyName = 'Zombies Captured';
        const zombies = locations[keyName].zombies;
        const locationID = locations[keyName].id;

        return <Location
            locationID={locationID}
            key={keyName}
            zombiesData={props.zombiesData}
            locations={locations}
            keyName={keyName}
            zombies={zombies} />
    }

    function renderItem() {
        return Object.keys(locations).sort((a, b) => a.localeCompare(b)).map(keyName => {
            if (keyName === 'Zombies Captured') return;

            const zombies = locations[keyName].zombies;
            const locationID = locations[keyName].id;

            return <Location
                locationID={locationID}
                key={keyName}
                zombiesData={props.zombiesData}
                locations={locations}
                keyName={keyName}
                zombies={zombies} />
        })
    }

    return (
        <Row style={{ marginTop: 15 }} gutter={16}>
            {renderFreeZombies()}
            {renderItem()}
        </Row>
    )
}

export default Locations;