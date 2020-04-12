import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import PasswordStrength from '../PasswordStrength/PasswordStrength'

const RegisterForm = ({ handleSubmit, errors }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  const handleInputChange = (event) => {
    event.persist()
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e, inputs)}>
      <Form.Row>
        <Form.Group as={Col} controlId="registerFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            placeholder="First Name"
            onChange={handleInputChange}
            value={inputs.firstName}
            name="firstName"
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="registerLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            placeholder="Last Name"
            onChange={handleInputChange}
            value={inputs.lastName}
            name="lastName"
            required
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="registerEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleInputChange}
            value={inputs.email}
            name="email"
            required
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            value={inputs.password}
            name="password"
            required
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
          <PasswordStrength password={inputs.password} />
        </Form.Group>
      </Form.Row>

      <Button
        id="registerButton"
        variant="primary"
        type="submit"
        className="float-right"
      >
        Submit
      </Button>
    </Form>
  )
}

export default RegisterForm
