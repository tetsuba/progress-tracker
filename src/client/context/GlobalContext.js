import React, { Component } from 'react'
import ModalCtx from '../components/Modal/ModalContext'
import AuthenticatedCxt from './AuthenticatedContext'

export default class GlobalContext extends Component {
  render() {
    return (
      <ModalCtx>
        <AuthenticatedCxt>{this.props.children}</AuthenticatedCxt>
      </ModalCtx>
    )
  }
}
