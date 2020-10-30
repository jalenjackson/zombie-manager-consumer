import React from 'react';
import MainApolloClient from './utils/ApolloClient';
import Locations from './components/Locations';
import Location from './components/Location';
import { ApolloProvider } from '@apollo/client';
import { useTransition, animated } from 'react-spring';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';

function App(props: RouteComponentProps) {
    const { location } = props;

    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: 'translate3d(105px, 0, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'translate3d(-55px, 0, 0)' }
    });

    return (
        <ApolloProvider client={MainApolloClient}>
            { transitions.map(({ item, props, key }) => (
                <animated.div key={key} style={{ ...props, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <Switch location={item}>
                        <Route exact path='/' component={Locations} />
                        <Route exact path='/location/:id' component={Location} />
                    </Switch>
                </animated.div>
            )) }
        </ApolloProvider>
    );
}

export default withRouter(App);
