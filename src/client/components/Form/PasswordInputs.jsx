import React from 'react'
import { Form } from 'react-bootstrap';

// COMPONENTS
import PasswordStrength from '../PasswordStrength/PasswordStrength';

// UTILS
import { passwordMatchError } from './form-utils'

export default function PasswordInputs(props) {
  const { register, inputs, setInputs } = props
  const passwordMissMatchError = passwordMatchError(inputs)

  return (
    <>
      <Form.Group controlId="newPassword" className="mb-3">
        <Form.Label className="text-muted">
          { register ? 'Password': 'New password'}
        </Form.Label>
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
    </>
  )
}