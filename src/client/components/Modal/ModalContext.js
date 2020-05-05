import * as React from 'react'

export const ModalContext = React.createContext({
  ModalTemplate: null,
  modalProps: {
    show: false,
    size: 'lg',
    'aria-labelledby': 'contained-modal-title-vcenter',
    centered: 'centered',
  },
  toggleModal: () => {},
  addTemplate: () => {},
})

type Props = {
  children: React.Node,
}

export default class ModalCtx extends React.Component<Props> {
  state = {
    modalProps: {
      show: false,
      size: 'lg',
      'aria-labelledby': 'contained-modal-title-vcenter',
      centered: 'centered',
    },
    ModalTemplate: null,
    toggleModal: (data) =>
      this.setState({
        ...this.state,
        data: data || {},
        modalProps: {
          ...this.state.modalProps,
          show: !this.state.modalProps.show,
        },
      }),

    addTemplate: (template) =>
      this.setState({
        ...this.state,
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
