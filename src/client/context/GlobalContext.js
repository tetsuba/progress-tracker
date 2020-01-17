import React, { Component } from 'react';
import UserCxt from './UserContext'
import ModalCtx from '../components/Modal/ModalContext';
import AuthenticatedCxt from './AuthenticatedContext';

export default class GlobalContext extends Component {
    render() {
        return (
        <ModalCtx>
            <AuthenticatedCxt>
                <UserCxt>
                    { this.props.children }
                </UserCxt>
            </AuthenticatedCxt>
        </ModalCtx>
        )
    }
}
