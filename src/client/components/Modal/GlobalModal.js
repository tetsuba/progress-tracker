import React, { Fragment, useContext } from 'react'
import { Modal } from 'react-bootstrap'
// $FlowFixMe - Investigate how to fix
import { ModalContext } from '../../context/ModalContext'

export default function GlobalModal() {
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
