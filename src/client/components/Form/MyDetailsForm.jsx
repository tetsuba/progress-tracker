import React from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import Box from '../Box/Box'
import { useInputChange } from '../../hooks/hooks'

export default function MyDetailsForm(props) {
  const { handleSubmit, user, showForm, setShowForm } = props
  const [inputs, setInputs] = useInputChange({
    firstName: user.firstName,
    lastName: user.lastName,
  })

  return (
    <Row>
      <Box max={500}>
        <h3 className="mb-5">My Details</h3>
        <Form onSubmit={(e) => handleSubmit(e, inputs)}>
          <Form.Group controlId="formPlaintextFirstName" className="pb-3">
            <Form.Label className="text-muted">First Name:</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              placeholder={user.firstName}
              onChange={setInputs}
              value={inputs.firstName}
              readOnly={!showForm}
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
              readOnly={!showForm}
            />
          </Form.Group>
          {showForm ? (
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
                className="float-right mr-3"
                variant="secondary"
                onClick={() => {
                  setInputs({
                    firstName: user.firstName,
                    lastName: user.lastName,
                  })
                  setShowForm((data) => ({ show: false }))
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              style={{ width: 100 }}
              className="float-right"
              variant="primary"
              onClick={() => setShowForm((data) => ({ show: true }))}
            >
              Edit
            </Button>
          )}
        </Form>
      </Box>
    </Row>
  )
}
