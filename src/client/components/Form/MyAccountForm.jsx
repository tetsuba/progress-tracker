import React, { Fragment, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const MyAccountForm = ({ handleSubmit, user, showForm, setShowForm }) => {
  const [inputs, setInputs] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  })

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setInputs((userInputs) => ({
      ...userInputs,
      [name]: value,
    }))
  }

  return (
    <Form
      onSubmit={(e) => handleSubmit(e, inputs)}
      className="p-5 border rounded mt-5"
    >
      <Form.Group as={Row} controlId="formPlaintextFirstName" className="pb-3">
        <Form.Label column sm="2">
          First Name:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            type="text"
            name="firstName"
            placeholder={user.firstName}
            onChange={handleInputChange}
            value={inputs.firstName}
            readOnly={!showForm}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextPassword" className="pb-3">
        <Form.Label column sm="2">
          Last Name:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            type="input"
            name="lastName"
            placeholder={user.lastName}
            value={inputs.lastName}
            onChange={handleInputChange}
            readOnly={!showForm}
          />
        </Col>
      </Form.Group>
      {showForm ? (
        <Fragment>
          <Button
            style={{ width: 100 }}
            className="float-right"
            variant="primary"
            type="submit"
          >
            Save
          </Button>

          <Button
            style={{ width: 100 }}
            className="float-right mr-3"
            variant="secondary"
            onClick={() => {
              setInputs({
                firstName: user.firstName,
                lastName: user.lastName,
              })
              setShowForm((data) => ({ show: false }))
            }}
          >
            Cancel
          </Button>
        </Fragment>
      ) : (
        <Button
          style={{ width: 100 }}
          className="float-right"
          variant="primary"
          onClick={() => setShowForm((data) => ({ show: true }))}
        >
          Edit
        </Button>
      )}
    </Form>
  )
}

export default MyAccountForm
