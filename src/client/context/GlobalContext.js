import * as React from 'react'
// $FlowFixMe
import ModalCtx from '../components/Modal/ModalContext'
// $FlowFixMe
import AuthenticatedProvider from './AuthenticatedContext'

type Props = {
  children: React.Node,
}

export default class GlobalContext extends React.Component<Props> {
  render() {
    return (
      <ModalCtx>
        <AuthenticatedProvider>{this.props.children}</AuthenticatedProvider>
      </ModalCtx>
    )
  }
}
