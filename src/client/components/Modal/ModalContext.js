import React, { Component } from 'react'

export const ModalContext = React.createContext({
  ModalTemplate: null,
  modalProps: {},
  toggleModal: () => {},
  addTemplate: () => {},
})

export default class ModalCtx extends Component {
  state = {
    modalProps: {
      show: false,
      size: 'lg',
      'aria-labelledby': 'contained-modal-title-vcenter',
      centered: 'centered',
    },
    ModalTemplate: null,
  }

  toggleModal = (data) =>
    this.setState({
      ...this.state,
      data: data || {},
      modalProps: {
        ...this.state.modalProps,
        show: !this.state.modalProps.show,
      },
    })

  addTemplate = (template) =>
    this.setState({
      ...this.state,
      ModalTemplate: template,
    })

  render() {
    return (
      <ModalContext.Provider
        value={{
          ...this.state,
          toggleModal: this.toggleModal,
          addTemplate: this.addTemplate,
        }}
      >
        {this.props.children}
      </ModalContext.Provider>
    )
  }
}
