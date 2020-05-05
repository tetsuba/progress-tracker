import React, { useContext, useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'

// COMPONENTS
import TextLink from '../TextLink/TextLink'
import Box from '../Box/Box'

// CONTEXT
// $FlowFixMe - Investigate how to fix this issue
import { AuthenticatedContext } from '../../context/AuthenticatedContext'

// HOOKS
import { useInputChange } from '../../hooks/hooks'

// MUTATIONS
import { LOGIN_USER_MUTATION } from '../../api/user/user.mutation'

type Props = {
  setPageState: (string) => void,
}

export default function LoginForm(props: Props) {
  const { setPageState } = props
  const [loginUser] = useMutation(LOGIN_USER_MUTATION)
  const { toggle: authenticateUser } = useContext(AuthenticatedContext)
  const [inputs, setInputs] = useInputChange({
    email: 'test@test.com',
    password: '1234qwer',
  })
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <Box max={500}>
      <Col>
        <h3>Login</h3>
        <Form
          id="LoginForm"
          onSubmit={(e) => {
            e.preventDefault()
            const options = { variables: { input: inputs } }
            loginUser(options)
              .then((obj: any) => {
                authenticateUser(obj.data.loginUser.token)
              })
              .catch(({ graphQLErrors }) => {
                switch (graphQLErrors[0].name) {
                  case 'email_not_verified':
                    setPageState('emailNotVerified')
                    break
                  default:
                    setErrorMessage(graphQLErrors[0].message)
                }
              })
          }}
        >
          <Form.Group controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={setInputs}
              value={inputs.email}
              isInvalid={!!errorMessage}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="password"
              onChange={setInputs}
              value={inputs.password}
              isInvalid={!!errorMessage}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            id="LoginFormSubmit"
            variant="primary"
            type="submit"
            className="float-right"
          >
            Login
          </Button>
        </Form>
        <TextLink eventHandler={() => setPageState('forgetMyPassword')}>
          Forgot password?
        </TextLink>
      </Col>
    </Box>
  )
}
