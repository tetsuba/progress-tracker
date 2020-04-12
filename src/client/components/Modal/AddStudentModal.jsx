import React, { Fragment, useState, useContext } from 'react'
import { Button, Col, Form, Modal } from 'react-bootstrap'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { STUDENTS_QUERY } from '../../screens/Students/Students'
import { ModalContext } from './ModalContext'
import { UserContext } from '../../context/UserContext'

const NEW_STUDENT_MUTATION = gql`
  mutation NewStudent($input: NewStudentInput!) {
    addNewStudent(input: $input) {
      id
    }
  }
`

function AddStudentModal(props) {
  const { userId } = useContext(UserContext)
  const { toggleModal } = useContext(ModalContext)
  const [inputs, setInputs] = useState({ teacherID: userId || '0001' })
  const [addNewStudent] = useMutation(NEW_STUDENT_MUTATION, {
    refetchQueries: [{ query: STUDENTS_QUERY }],
  })

  const handleInputChange = (event) => {
    event.persist()
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit', inputs)
    addNewStudent({ variables: { input: inputs } })
      .then(({ data }) => {
        toggleModal()
      })
      .catch((err) => console.log(err))
  }

  return (
    <Fragment>
      <Modal.Header>
        <Modal.Title>Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="First Name"
                onChange={handleInputChange}
                value={inputs.firstName}
                name="firstName"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Last Name"
                onChange={handleInputChange}
                value={inputs.lastName}
                name="lastName"
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridDOB">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                placeholder="DOB"
                onChange={handleInputChange}
                value={inputs.DOB}
                name="DOB"
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Button
              className="float-right"
              variant="secondary"
              onClick={toggleModal}
            >
              Close
            </Button>
            <Button
              className="float-right ml-2"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Fragment>
  )
}

export default AddStudentModal
