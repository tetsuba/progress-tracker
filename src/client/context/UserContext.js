import React, { Component } from 'react';

export const UserContext = React.createContext({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    addUserId: () => {},
    userLoggedIn: () => {},
    userUpdate: () => {},
});


export default class UserCxt extends Component {
    state = {
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
    };

    addUserId = (id) => this.setState({ userId: id, loggedIn: true });
    userLoggedIn = (data) => this.setState({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        userId: data.id,
    });
    userUpdate = (data) => this.setState({
        ...this.state,
        firstName: data.firstName,
        lastName: data.lastName,
    });

    render() {
        return (
            <UserContext.Provider value={{
                ...this.state,
                addUserId: this.addUserId,
                userLoggedIn: this.userLoggedIn,
                userUpdate: this.userUpdate,
            }}>
                { this.props.children }
            </UserContext.Provider>
        )
    }
}

