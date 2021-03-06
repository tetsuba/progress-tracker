import * as React from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useInputChange } from '../../hooks/hooks'
import { useMutation } from '@apollo/react-hooks'
import { STUDENTS_QUERY } from '../../api/student/student.query'
import { ADD_STUDENT_MUTATION } from '../../api/student/student.mutation'
import DobInput from './Inputs/DobInput'

type Props = {
  toggleModal: () => void,
}

export default function AddStudentForm(props: Props) {
  const { toggleModal } = props
  const [addStudent] = useMutation(ADD_STUDENT_MUTATION, {
    refetchQueries: [{ query: STUDENTS_QUERY }],
  })
  const [inputs, setInputs] = useInputChange({
    firstName: '',
    lastName: '',
    DOBDate: '01',
    DOBMonth: '01',
    DOBYear: new Date().getFullYear(),
  })
  return (
    <Form
      id="AddStudentForm"
      onSubmit={(e) => {
        e.preventDefault()
        const DOB = `${inputs.DOBYear}-${inputs.DOBMonth}-${inputs.DOBDate}`
        const variables = {
          input: {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            DOB: String(Date.parse(DOB)),
          },
        }

        addStudent({ variables })
          .then(({ data }) => {
            toggleModal()
          })
          .catch((err) => console.log(err))
      }}
    >
      <Form.Row className="pt-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Control
            size="lg"
            placeholder="First Name"
            onChange={setInputs}
            value={inputs.firstName}
            name="firstName"
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row className="pt-3">
        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Control
            size="lg"
            placeholder="Last Name"
            onChange={setInputs}
            value={inputs.lastName}
            name="lastName"
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Label column="lg" className="pt-3">
        Date of birth
      </Form.Label>
      <DobInput inputs={inputs} setInputs={setInputs} />

      <Form.Row>
        <Button
          className="float-right"
          variant="secondary"
          onClick={toggleModal}
        >
          Close
        </Button>
        <Button className="float-right ml-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form.Row>
    </Form>
  )
}
