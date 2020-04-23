import React from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import TextLink from '../TextLink/TextLink'
import { useInputChange } from '../../hooks/hooks'
import Box from '../Box/Box'

export default function LoginForm(props) {
  const { handleSubmit, error, hideLoginForm } = props
  const [inputs, setInputs] = useInputChange({
    email: 'test@test.com',
    password: '1234qwer',
  })

  return (
    <Box max={500}>
      <Col>
        <h3>Login</h3>
        <Form
          id="LoginForm"
          onSubmit={(e) => {
            e.preventDefault()
            const options = { variables: { input: inputs } }
            handleSubmit(options)
          }}
        >
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
            id="LoginFormSubmit"
            variant="primary"
            type="submit"
            className="float-right"
          >
            Submit
          </Button>
        </Form>
        <TextLink eventHandler={hideLoginForm}>Forgot password?</TextLink>
      </Col>
    </Box>
  )
}

LoginForm.defaultProps = {
  error: {
    email: undefined,
    password: undefined,
  },
}
