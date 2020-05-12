import * as React from 'react'

export const ModalContext = React.createContext({
  ModalTemplate: null,
  show: false,
  hideModal: () => {},
  toggleModal: () => {},
  addTemplate: () => {},
})

type Props = {
  children: React.Node,
}

export default class ModalProvider extends React.Component<Props> {
  state = {
    show: false,
    ModalTemplate: null,
    hideModal: () => this.setState({ show: false }),
    toggleModal: () =>
      this.setState({
        show: !this.state.show,
      }),

    addTemplate: (template) =>
      this.setState({
        ModalTemplate: template,
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
