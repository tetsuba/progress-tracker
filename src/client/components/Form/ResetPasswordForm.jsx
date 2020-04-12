import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'

// UTILS
import { passwordMatchError, passwordsDoNotMatched } from './form-utils'

// HOOKS
import { useInputChange } from '../../hooks/hooks'

// COMPONENTS
import PasswordStrength from '../PasswordStrength/PasswordStrength'

const ResetPasswordForm = ({ resetPassword, token }) => {
  const [inputs, setInputs] = useInputChange({
    newPassword: '',
    confirmPassword: '',
  })

  const options = {
    variables: {
      input: {
        token: token,
        password: inputs.newPassword,
      },
    },
  }
  const passwordMissMatchError = passwordMatchError(inputs)

  return (
    <>
      <Row className="mt-5">
        <h1>Reset Password</h1>
      </Row>
      <Row>
        <Form
          id="ResetPasswordForm"
          className="w-100"
          onSubmit={(e) => {
            e.preventDefault()
            if (inputs.newPassword !== inputs.confirmPassword) return
            resetPassword(options)
          }}
        >
          <Form.Group controlId="newPassword">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="newPassword"
              onChange={setInputs}
              value={inputs.newPassword}
            />
            <PasswordStrength password={inputs.newPassword} />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="confirmPassword"
              onChange={setInputs}
              value={inputs.confirmPassword}
              isInvalid={passwordMissMatchError}
            />
            <Form.Control.Feedback type="invalid">
              {passwordMissMatchError && 'Passwords do not match!!!'}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              {`Matching password ${inputs.confirmPassword.length} of ${inputs.newPassword.length}`}
            </Form.Text>
          </Form.Group>
          <Button
            id="ResetPasswordSubmit"
            variant="primary"
            type="submit"
            disabled={passwordsDoNotMatched(inputs)}
          >
            Reset Password
          </Button>
        </Form>
      </Row>
    </>
  )
}

export default ResetPasswordForm
