import React, { Fragment, useContext } from 'react'
import { Container, Modal } from 'react-bootstrap'
// $FlowFixMe - Investigate how to fix
import { ModalContext } from '../../context/ModalContext'
import AlphabetForm from '../Alphabet/AlphabetForm'

export default function AlphabetModal() {
  const { toggleModal, storedProps } = useContext(ModalContext)
  return (
    <Fragment>
      <Modal.Header>
        <Modal.Title>Add assessment data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <AlphabetForm toggleModal={toggleModal} {...storedProps} />
        </Container>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Fragment>
  )
}
