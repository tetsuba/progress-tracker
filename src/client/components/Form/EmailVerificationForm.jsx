import React from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'

// MUTATIONS
import { VERIFY_EMAIL_MUTATION } from '../../api/user/user.mutation'

// HOOKS
import { useInputChange, useSuccess, useError } from '../../hooks/hooks'

export default function EmailVerificationForm({ defaultEmail = '' }) {
  const [verifyEmail] = useMutation(VERIFY_EMAIL_MUTATION)
  const [inputs, setInputs] = useInputChange({ email: defaultEmail })
  const [error, setError] = useError({ message: '' })
  const [success, setSuccess] = useSuccess('verifyEmail')
  const options = { variables: { input: inputs } }

  return success ? (
    <Row>
      <h3>Please check your email.</h3>
    </Row>
  ) : (
    <Row>
      <h3>Email not verified</h3>
      <p>Please validate your email before logging in</p>
      <Form
        id="EmailVerificationForm"
        onSubmit={(e) => {
          e.preventDefault()
          verifyEmail(options).then(setSuccess).catch(setError)
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={setInputs}
            value={inputs.email}
            isInvalid={!!error.message}
          />
          <Form.Control.Feedback type="invalid">
            {error.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Row>
  )
}
