import * as React from 'react'
import type { Node } from 'react'
// $FlowFixMe - Applying a type to createContext<T> breaks react from compiling the app.
export const ModalContext = React.createContext({
  show: false,
})

type Props = {
  children: Node,
}

type State = {
  show: boolean,
  ModalTemplate: ?Node,
  hideModal: () => void,
  toggleModal: () => void,
  addTemplate: () => void,
  storedProps: any,
}

export default class ModalProvider extends React.Component<Props, State> {
  state = {
    show: false,
    ModalTemplate: null,
    hideModal: () => this.setState({ show: false }),
    toggleModal: () =>
      this.setState({
        show: !this.state.show,
      }),
    storedProps: {},

    addTemplate: (template, props) =>
      this.setState({
        ModalTemplate: template,
        storedProps: props,
      }),
  }

  render() {
    return (
      <ModalContext.Provider value={this.state}>
        {this.props.children}
      </ModalContext.Provider>
    )
  }
}
