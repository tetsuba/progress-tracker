import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'

// COMPONENT
import TextLink from '../TextLink/TextLink'
import { useInputChange } from '../../hooks/hooks'
import Box from '../Box/Box'

export default function ForgotMyPasswordForm(props) {
  const { children, showLoginForm, handleSubmit, error, defualtEmail } = props
  const [inputs, setInputs] = useInputChange({ email: '' })
  const [errorMessage] = useState(() => error && error.graphQLErrors[0].message)
  const options = { variables: { input: inputs } }

  return (
    <Box max={500}>
      <Row>
        <Col>
          {children}
          <Form
            id="ForgotMyPasswordForm"
            className="w-100"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(options)
            }}
          >
            <Form.Group controlId="ForgotMyPasswordEmail">
              <Form.Control
                required
                type="email"
                placeholder={defualtEmail ? defualtEmail : '@'}
                name="email"
                onChange={setInputs}
                value={inputs.email}
                isInvalid={!!errorMessage}
                readOnly={!!defualtEmail}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                {!defualtEmail &&
                  "We'll never share your email with anyone else."}
              </Form.Text>
            </Form.Group>
            <Button
              id="ForgotMyPasswordSubmit"
              className="float-right"
              variant="primary"
              type="submit"
            >
              Reset Password
            </Button>
          </Form>
          {showLoginForm && (
            <TextLink eventHandler={showLoginForm}>
              <FontAwesomeIcon icon={faCaretLeft} /> back
            </TextLink>
          )}
        </Col>
      </Row>
    </Box>
  )
}
