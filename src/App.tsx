import React from 'react';
import MainApolloClient from './utils/ApolloClient';
import LocationsWrapper from './components/Locations';
import { ApolloProvider } from '@apollo/client';

import './index.scss';

function App() {
    return (
        <ApolloProvider client={MainApolloClient}>
            <LocationsWrapper />
        </ApolloProvider>
    );
}

export default App
