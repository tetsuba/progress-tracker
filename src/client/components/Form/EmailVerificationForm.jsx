import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Col } from 'react-bootstrap'

// HOOKS
import { useInputChange } from '../../hooks/hooks'

// COMPONENTS
import Box from '../Box/Box'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'

export default function EmailVerificationForm(props) {
  const { handleSubmit, error } = props
  const [errorMessage] = useState(() => error && error.graphQLErrors[0].message)
  const [inputs, setInputs] = useInputChange({ email: '' })
  const options = { variables: { input: inputs } }

  return (
    <Box max={500}>
      <Col>
        <h3 className="text-danger">Could not sign you in</h3>
        <p>
          Your email address has not been confirmed. Please enter your email
          address below and a link will be sent to confirm your email address.
        </p>
        <Form
          id="EmailVerificationForm"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(options)
          }}
        >
          <Form.Group controlId="EmailVerificationEmail">
            <Form.Control
              required
              type="email"
              placeholder="email@address.com"
              name="email"
              onChange={setInputs}
              value={inputs.email}
              isInvalid={!!errorMessage}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Button
            id="EmailVerificationSubmit"
            className="float-right"
            variant="primary"
            type="submit">
            Send
          </Button>
        </Form>
        <Link to="/">
          <FontAwesomeIcon icon={faCaretLeft} /> back
        </Link>
      </Col>
    </Box>
  )
}
