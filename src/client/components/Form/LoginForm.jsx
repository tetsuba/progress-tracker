import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import EmailVerificationForm from './EmailVerificationForm'
import TextLink from '../TextLink/TextLink'
import { useInputChange } from '../../hooks/hooks'

export default function LoginForm({ handleSubmit, error, resetPassword }) {
  const [inputs, setInputs] = useInputChange({
    email: 'test@test.com',
    password: '1234qwer',
  })

  return error.emailNotVerified ? (
    <Col>
      <EmailVerificationForm defaultEmail={error.email} />
    </Col>
  ) : (
    <Col>
      <h3>Login</h3>
      <Form id="loginForm" onSubmit={(e) => handleSubmit(e, inputs)}>
        <Form.Group controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={setInputs}
            value={inputs.email}
            isInvalid={!!error.email}
          />
          <Form.Control.Feedback type="invalid">
            {error.email && error.email.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            name="password"
            onChange={setInputs}
            value={inputs.password}
            isInvalid={!!error.password}
          />
          <Form.Control.Feedback type="invalid">
            {error.password && error.password.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          id="loginButton"
          variant="primary"
          type="submit"
          className="float-right"
        >
          Submit
        </Button>
      </Form>
      <TextLink eventHandler={resetPassword}>Forgot password?</TextLink>
    </Col>
  )
}
