import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ZOMBIES } from '../../utils/queries';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LocationsLoader from '../Loader';
import LocationsError from '../Error';
import AddNewLocation from './AddNewLocation';
import Locations from './Locations';
import NewLocationButton from './NewLocationButton';
import Banner from '../Banner';
import AddNewZombie from './AddNewZombie';

import './index.scss';

function LocationsWrapper() {
    const zombiesData = useQuery(GET_ZOMBIES);

    if (zombiesData.loading) return <LocationsLoader />;
    if (zombiesData.error) return <LocationsError />;

    return (
        <div>
            <Banner />
            <div className='locations-wrapper'>
                <NewLocationButton />
                <AddNewLocation zombiesData={zombiesData} />
                <DndProvider backend={HTML5Backend}>
                    <Locations zombiesData={zombiesData} />
                </DndProvider>
            </div>
            <AddNewZombie zombiesData={zombiesData} />
        </div>
    );
}

export default LocationsWrapper;