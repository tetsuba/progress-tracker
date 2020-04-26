import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import Box from '../Box/Box'
import { useInputChange } from '../../hooks/hooks'

export default function MyDetailsForm(props) {
  const { handleSubmit, user, error } = props
  const errorMessage = error && error.graphQLErrors[0].message
  const [inputs, setInputs] = useInputChange({
    firstName: user.firstName,
    lastName: user.lastName,
  })
  const [showFormElement, setShowFormElement] = useState(false)
  const options = {
    variables: {
      input: {
        ...inputs,
      },
    },
  }

  return (
    <Row>
      <Box max={500}>
        <h3 className="mb-5">My Details</h3>
        <Form
          id="MyDetailsForm"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(options, setShowFormElement)
          }}
        >
          <Form.Group controlId="formPlaintextFirstName" className="pb-3">
            <Form.Label className="text-muted">First Name:</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              placeholder={user.firstName}
              onChange={setInputs}
              value={inputs.firstName}
              readOnly={!showFormElement}
              isInvalid={!!errorMessage}
            />
          </Form.Group>
          <Form.Group controlId="formPlaintextPassword">
            <Form.Label className="text-muted">Last Name:</Form.Label>
            <Form.Control
              required
              type="input"
              name="lastName"
              placeholder={user.lastName}
              value={inputs.lastName}
              onChange={setInputs}
              readOnly={!showFormElement}
              isInvalid={!!errorMessage}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </Form.Group>
          {showFormElement ? (
            <>
              <Button
                style={{ width: 100 }}
                className="float-right"
                variant="primary"
                type="submit"
              >
                Save
              </Button>

              <Button
                style={{ width: 100 }}
                type="button"
                className="float-right mr-3"
                variant="secondary"
                onClick={() => setShowFormElement(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              id="MyDetailsFormEdit"
              style={{ width: 100 }}
              className="float-right"
              variant="primary"
              onClick={() => setShowFormElement(true)}
            >
              Edit
            </Button>
          )}
        </Form>
      </Box>
    </Row>
  )
}
