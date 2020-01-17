import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import MyAccount from './screens/MyAccount/MyAccount';
import Student from './screens/Student/Student';
import CourseRoutes from './screens/Course/routes';
import Students from './screens/Students/Students';
import {UserContext} from './context/UserContext';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {AuthenticatedContext} from './context/AuthenticatedContext';

export const USER_SESSION = gql`
    query($token: String!){
        isUserSessionExpired(token: $token) {
            firstName
            lastName
            id
            email
        }
    }
`;

function Loading() {
    return (<div>Loading...</div>)
}

export const Routes = () => {
    const { authenticated, toggle: authenticateUser } = useContext(AuthenticatedContext);
    const { userLoggedIn } = useContext(UserContext);
    const token = localStorage.getItem('ptToken');
    const { loading, data } = useQuery(USER_SESSION, {variables: {token}});

    if (loading) {
        return <Loading />;
    }
    console.log('token: ', token)
    console.log('authenticated: ', authenticated)
    console.log('data: ', data)

    if (data && !authenticated) {
        console.log('APP:', data)
        userLoggedIn(data.isUserSessionExpired);
        authenticateUser(true)
        return <div>Loading...</div>
    }

    function ProtectedRoute({Component, ...rest}) {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    authenticated
                        ? <Component />
                        : <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                }
            />
        );
    }

    function UnProtectedRoute({Component, ...rest}) {
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

    return (
        <Switch>
            <ProtectedRoute path="/" exact Component={Home} />
            <ProtectedRoute path="/students" Component={Students} />
            <ProtectedRoute path="/myAccount" Component={MyAccount} />
            <ProtectedRoute path="/student/:id" Component={Student} />

            <UnProtectedRoute path="/login" Component={Login} />

            <Route path="/register" component={Register} />
            <CourseRoutes />
        </Switch>
    )
};
