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
  const { handleSubmit, error, backButton, children } = props
  const errorMessage = error && error.graphQLErrors[0].message
  const [inputs, setInputs] = useInputChange({ email: '' })
  const options = { variables: { input: inputs } }

  return (
    <Box max={500}>
      <Col>
        {children}
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
            type="submit"
          >
            Send
          </Button>
        </Form>
        {backButton && (
          <Link to="/">
            <FontAwesomeIcon icon={faCaretLeft} /> back
          </Link>
        )}
      </Col>
    </Box>
  )
}
