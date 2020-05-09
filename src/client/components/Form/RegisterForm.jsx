import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'

// CONTEXT
// $FlowFixMe - Investigate how to fix context flow issue
import { LoadingContext } from '../../context/LoadingContext'

// COMPONENTS
import Box from '../Box/Box'
import PasswordInputs from './Inputs/PasswordInputs'

// HOOKS
import { useInputChange } from '../../hooks/hooks'

// MUTATIONS
import { REGISTER_NEW_USER_MUTATION } from '../../api/user/user.mutation'

// UTILS
import { passwordsDoNotMatched } from './utils/form-utils'

type Props = {
  setPageState: (string) => void,
}

export default function RegisterForm(props: Props) {
  const { setPageState } = props
  const { showLoading, hideLoading } = React.useContext(LoadingContext)
  const [registerNewUser] = useMutation(REGISTER_NEW_USER_MUTATION)
  const [errorMessage, setErrorMessage] = useState('')

  const [inputs, setInputs] = useInputChange({
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  })

  const options = {
    variables: {
      input: {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        password: inputs.newPassword,
      },
    },
  }

  return (
    <Box max={500}>
      <h3>Registration</h3>
      <Form
        id="RegisterForm"
        className="mt-4 mb-5"
        onSubmit={(e) => {
          e.preventDefault()
          showLoading()
          registerNewUser(options)
            .then(() => {
              hideLoading()
              setPageState('success')
            })
            .catch(({ graphQLErrors }) => {
              hideLoading()
              setErrorMessage(graphQLErrors[0].message)
            })
        }}
      >
        <Form.Row>
          <Form.Group as={Col} controlId="RegisterFirstName">
            <Form.Control
              placeholder="First Name"
              onChange={setInputs}
              value={inputs.firstName}
              name="firstName"
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="RegisterLastName">
            <Form.Control
              placeholder="Last Name"
              onChange={setInputs}
              value={inputs.lastName}
              name="lastName"
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row className="mb-3">
          <Form.Group as={Col} controlId="RegisterEmail">
            <Form.Control
              type="email"
              placeholder="Your email address"
              onChange={setInputs}
              value={inputs.email}
              name="email"
              required
              isInvalid={!!errorMessage}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <PasswordInputs inputs={inputs} setInputs={setInputs} register />

        <Button
          id="RegisterFormSubmit"
          variant="primary"
          type="submit"
          className="float-right"
          disabled={passwordsDoNotMatched(inputs)}
        >
          Register
        </Button>
      </Form>
    </Box>
  )
}
