import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Col, Container, Row } from 'react-bootstrap'

// CONTEXT
import { AuthenticatedContext } from '../../context/AuthenticatedContext'

// MUTATION
import {
  LOGIN_USER_MUTATION,
  REQUEST_PASSWORD_RESET_MUTATION,
  VERIFY_USER_EMAIL_MUTATION,
} from '../../api/user/user.mutation'

// COMPONENTS
import LoginForm from '../../components/Form/LoginForm'
import ForgotMyPasswordForm from '../../components/Form/ForgotMyPasswordForm'
import Loading from '../../components/Loading/Loading'
import EmailVerificationForm from '../../components/Form/EmailVerificationForm'

// UTILS
import { getLoginError } from '../../components/Form/form-utils'
import { getLoginStatus } from '../screens-utils'

export default function Login() {
  const [loginUser, loginUserOptions] = useMutation(LOGIN_USER_MUTATION)
  const [verifyUserEmail, verifyUserEmailOptions] = useMutation(
    VERIFY_USER_EMAIL_MUTATION
  )
  const [requestPasswordReset, requestPasswordResetOptions] = useMutation(
    REQUEST_PASSWORD_RESET_MUTATION
  )
  const [hideLoginForm, setHideLoginForm] = useState(false)
  const { toggle: authenticateUser } = useContext(AuthenticatedContext)

  return (
    <Container className="pt-5">
      <Row>
        {
          {
            loading: <Loading />,
            login: (
              <LoginForm
                error={getLoginError(loginUserOptions.error)}
                hideLoginForm={() => setHideLoginForm(true)}
                handleSubmit={(options) => {
                  loginUser(options)
                    .then(({ data }) => {
                      authenticateUser(data.loginUser.token)
                    })
                    .catch((err) => console.log('Login error'))
                }}
              />
            ),
            forgetMyPassword: (
              <ForgotMyPasswordForm
                showLoginForm={() => setHideLoginForm(false)}
                handleSubmit={(options) => {
                  requestPasswordReset(options).catch(() =>
                    console.log('error')
                  )
                }}
                error={requestPasswordResetOptions.error}
              >
                <h3>Forgot my password</h3>
                <p>
                  Enter your email address and we will send you a link to reset
                  your password.
                </p>
              </ForgotMyPasswordForm>
            ),
            emailNotVerified: (
              <EmailVerificationForm
                backButton
                error={verifyUserEmailOptions.error}
                handleSubmit={(options) => {
                  verifyUserEmail(options).catch(() => console.log('error'))
                }}
              >
                <h3 className="text-danger">Could not sign you in</h3>
                <p>
                  Your email address has not been confirmed. Please enter your
                  email address below and a link will be sent to confirm your
                  email address.
                </p>
              </EmailVerificationForm>
            ),
            success: (
              <Col id="LoginSuccess">
                <h3>Please check your email.</h3>
              </Col>
            ),
          }[
            getLoginStatus(
              hideLoginForm,
              loginUserOptions,
              verifyUserEmailOptions,
              requestPasswordResetOptions
            )
          ]
        }
      </Row>
    </Container>
  )
}
