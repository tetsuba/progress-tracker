import React, { Fragment, useContext } from 'react'
import { Container, Modal } from 'react-bootstrap'
// $FlowFixMe - Investigate how to fix
import { ModalContext } from '../../context/ModalContext'
import AddStudentForm from '../Form/AddStudentForm'

function AddStudentModal() {
  const { toggleModal } = useContext(ModalContext)
  return (
    <Fragment>
      <Modal.Header>
        <Modal.Title>Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <AddStudentForm toggleModal={toggleModal} />
        </Container>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Fragment>
  )
}

export default AddStudentModal
