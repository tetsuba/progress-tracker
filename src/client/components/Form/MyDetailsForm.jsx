import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import Box from '../Box/Box'
import { useInputChange } from '../../hooks/hooks'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_USER_DETAILS_MUTATION } from '../../api/user/user.mutation'
import { GET_USER_DETAILS_QUERY } from '../../api/user/user.query'

// TYPES
import type { userDetailsType } from '../../types/userType'

type Props = {
  user: userDetailsType,
}

export default function MyDetailsForm(props: Props) {
  const { user } = props
  const [updateUserDetails] = useMutation(UPDATE_USER_DETAILS_MUTATION, {
    refetchQueries: [{ query: GET_USER_DETAILS_QUERY }],
  })
  const [errorMessage, setErrorMessage] = useState('')
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
            updateUserDetails(options)
              .then(() => setShowFormElement(false))
              .catch(({ graphQLErrors }) =>
                setErrorMessage(graphQLErrors[0].message)
              )
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
                id="MyDetailsFormSave"
                style={{ width: 100 }}
                className="float-right"
                variant="primary"
                type="submit"
              >
                Save
              </Button>

              <Button
                id="MyDetailsFormCancel"
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
