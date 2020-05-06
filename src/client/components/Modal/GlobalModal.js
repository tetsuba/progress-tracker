import React, { Fragment, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { ModalContext } from './ModalContext'

export const GlobalModal = () => {
  const { show, hideModal, ModalTemplate } = useContext(ModalContext)
  return (
    <Fragment>
      {ModalTemplate && (
        <Modal
          onHide={hideModal}
          show={show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalTemplate />
        </Modal>
      )}
    </Fragment>
  )
}
