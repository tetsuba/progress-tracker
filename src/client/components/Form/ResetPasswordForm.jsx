import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'

// UTILS
import { passwordMatchError, passwordsDoNotMatched } from './form-utils'

// HOOKS
import { useInputChange } from '../../hooks/hooks'

// COMPONENTS
import PasswordStrength from '../PasswordStrength/PasswordStrength'
import Box from '../Box/Box'

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
    <Box max={500}>
      <Row>
        <Col>
          <h3>Reset Password</h3>
          <Form
            id="ResetPasswordForm"
            className="w-100"
            onSubmit={(e) => {
              e.preventDefault()
              if (inputs.newPassword !== inputs.confirmPassword) return
              resetPassword(options)
            }}
          >
            <Form.Group controlId="newPassword" className="mb-3">
              <Form.Label className="text-muted">New password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="******"
                name="newPassword"
                onChange={setInputs}
                value={inputs.newPassword}
              />
              <PasswordStrength password={inputs.newPassword} />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label className="text-muted">Confirm password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="******"
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
              className="float-right"
              variant="primary"
              type="submit"
              disabled={passwordsDoNotMatched(inputs)}
            >
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Box>
  )
}

export default ResetPasswordForm
