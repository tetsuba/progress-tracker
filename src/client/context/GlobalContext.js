import * as React from 'react'
// $FlowFixMe
import ModalProvider from './ModalContext'
// $FlowFixMe
import AuthenticatedProvider from './AuthenticatedContext'
import LoadingProvider from './LoadingContext'

type Props = {
  children: React.Node,
}

export default class GlobalContext extends React.Component<Props> {
  render() {
    return (
      <LoadingProvider>
        <ModalProvider>
          <AuthenticatedProvider>{this.props.children}</AuthenticatedProvider>
        </ModalProvider>
      </LoadingProvider>
    )
  }
}
