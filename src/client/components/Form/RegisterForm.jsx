import React from 'react'
import { Button, Col, Form } from 'react-bootstrap'

// COMPONENTS
import Box from '../Box/Box'
import PasswordInputs from './PasswordInputs'

// HOOKS
import { useInputChange } from '../../hooks/hooks'

// UTILS
import { passwordsDoNotMatched } from './form-utils'

export default function RegisterForm(props) {
  const { handleSubmit, error } = props
  const errorMessage = error && error.graphQLErrors[0].message

  const [inputs, setInputs] = useInputChange({
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  })

  return (
    <Box max={500}>
      <h3>Registration</h3>
      <Form
        id="RegisterForm"
        className="mt-4 mb-5"
        onSubmit={(e) => {
          e.preventDefault()
          const options = {
            variables: {
              input: {
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                email: inputs.email,
                password: inputs.newPassword,
              },
            },
          }
          handleSubmit(options)
        }}
      >
        <Form.Row>
          <Form.Group as={Col} controlId="RegisterFirstName">
            <Form.Control
              placeholder="First Name"
              onChange={setInputs}
              value={inputs.firstName}
              name="firstName"
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="RegisterLastName">
            <Form.Control
              placeholder="Last Name"
              onChange={setInputs}
              value={inputs.lastName}
              name="lastName"
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row className="mb-3">
          <Form.Group as={Col} controlId="RegisterEmail">
            <Form.Control
              type="email"
              placeholder="Your email address"
              onChange={setInputs}
              value={inputs.email}
              name="email"
              required
              isInvalid={!!errorMessage}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <PasswordInputs inputs={inputs} setInputs={setInputs} register />

        <Button
          id="RegisterFormSubmit"
          variant="primary"
          type="submit"
          className="float-right"
          disabled={passwordsDoNotMatched(inputs)}
        >
          Register
        </Button>
      </Form>
    </Box>
  )
}
