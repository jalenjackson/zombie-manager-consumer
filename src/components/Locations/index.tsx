import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ZOMBIES } from '../../utils/queries';
import { useRecoilState } from 'recoil';
import { locationStateAtom } from './atoms';
import LocationsLoader from '../Loader';
import LocationsError from '../Error';
import alterRecoilState from '../../utils/alterRecoilState';
import AddNewLocation from './AddNewLocation';
import Locations from './Locations';

function LocationsWrapper() {
    const zombiesData = useQuery(GET_ZOMBIES);
    const [locationState, setLocationState] = useRecoilState(locationStateAtom);

    if (zombiesData.loading) return <LocationsLoader />;
    if (zombiesData.error) return <LocationsError />;

    function onAddNewLocationButtonClick() {
        return alterRecoilState(setLocationState, { addNewLocationModalVisibility: !locationState.addNewLocationModalVisibility });
    }

    return (
        <div>
            <Locations zombiesData={zombiesData} />
            <button onClick={onAddNewLocationButtonClick}>Add New Location</button>
            <AddNewLocation zombiesData={zombiesData} />
        </div>
    );
}

export default LocationsWrapper;