import React, {useContext} from 'react';
import { AuthenticatedContext } from '../context/AuthenticatedContext';
import {Redirect, Route} from 'react-router-dom';

export default function UnProtectedRoute({Component, ...rest}) {
    const { authenticated } = useContext(AuthenticatedContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !authenticated
                    ? <Component />
                    : <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
            }
        />
    );
}
