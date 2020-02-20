import React, { Component } from 'react';

export const AuthenticatedContext = React.createContext({
    authenticated: false,
    toggle: () => {},
});

export default class AuthenticatedCxt extends Component {

    state = {
        authenticated: false,
    };

    toggle = (authenticated) => {
        !authenticated && localStorage.setItem('ptToken', '');
        this.setState({ authenticated });
    }


    render() {
        return (
            <AuthenticatedContext.Provider value={{
                ...this.state,
                toggle: this.toggle,
            }}>
                { this.props.children }
            </AuthenticatedContext.Provider>
        )
    }
}

