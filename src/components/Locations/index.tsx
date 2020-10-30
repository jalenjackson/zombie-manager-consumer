import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_LOCATIONS, GET_ZOMBIES } from '../../utils/queries';
import { Location, Zombie } from '../../utils/commonInterfaces';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { locationStateAtom } from './atoms';
import LocationsLoader from '../Loader';
import LocationsError from '../Error';
import VirtualList from 'react-tiny-virtual-list';
import get from 'lodash/get';
import alterRecoilState from '../../utils/alterRecoilState';
import AddNewLocation from './AddNewLocation';

interface ItemProps {
    index: number
    style: any
}

function Locations() {
    const locationsData = useQuery<{ locations: Array<Location> }>(GET_LOCATIONS);
    const zombiesData = useQuery<{ zombies: Array<Zombie> }>(GET_ZOMBIES);
    const setLocationState = useSetRecoilState(locationStateAtom);
    const history = useHistory();

    if (locationsData.loading) return <LocationsLoader />;
    if (locationsData.error) return <LocationsError />;

    function onLocationSelected(locationName: string) {
        history.push(`/location/${locationName}`);
    }

    function renderItem(itemProps: ItemProps) {
        const { index, style } = itemProps;
        const location = get(locationsData, `data.locations.${itemProps.index}`, null);

        if (location) {
            return (
                <div
                    onClick={() => onLocationSelected(location.id)}
                    key={index}
                    style={style}>
                    {location.name}
                </div>
            )
        }

        return null;
    }

    function onAddNewLocationButtonClick() {
        return alterRecoilState(setLocationState, { addNewLocationModalVisibility: true });
    }

    if (get(locationsData, 'data.locations')) {
        return (
            <div>
                <VirtualList
                    width='100%'
                    height={600}
                    itemCount={get(locationsData, 'data.locations', []).length}
                    itemSize={50}
                    renderItem={renderItem}
                />
                <button onClick={onAddNewLocationButtonClick}>Add New Location</button>
                <AddNewLocation zombiesData={get(zombiesData, 'data.zombies')} />
            </div>
        )
    }

    return null;
}

export default Locations;