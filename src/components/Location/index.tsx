import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_LOCATION } from '../../utils/queries';
import LocationsLoader from '../Loader';
import LocationsError from '../Error';
import get from 'lodash/get';

function Location() {
    const history = useHistory();
    const id = history.location.pathname.split('/')[2];

    const { loading, error, data } = useQuery<{ locations: Location }>(GET_LOCATION, {
        variables: { id },
    });

    function goToLocations() {
        history.push('/');
    }

    if (loading) return <LocationsLoader />;
    if (error) return <LocationsError />;

    return (
        <div>
            <span onClick={goToLocations}>Locations</span>
            <br />
            {get(data, 'location.name')}
        </div>
    )
}

export default Location;