import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Col, Container, Row } from 'react-bootstrap'

// CONTEXT
import { AuthenticatedContext } from '../../context/AuthenticatedContext'

// MUTATION
import {
  LOGIN_MUTATION,
  SEND_PASSWORD_RESET_CONFIRMATION_MUTATION,
  VERIFY_EMAIL_MUTATION,
} from '../../api/user/user.mutation'

// COMPONENTS
import LoginForm from '../../components/Form/LoginForm'
import ForgotMyPasswordForm from '../../components/Form/ForgotMyPasswordForm'
import Loading from '../../components/Loading/Loading';

// UTILS
import { getLoginStatus, getLoginError } from '../../components/Form/form-utils'
import EmailVerificationForm from '../../components/Form/EmailVerificationForm';

export default function Login() {
  const [userLogin, userLoginOptions] = useMutation(LOGIN_MUTATION)
  const [verifyEmail, verifyEmailOptions] = useMutation(VERIFY_EMAIL_MUTATION)
  const [sendPasswordResetConfirmation, sendPasswordResetConfirmationOptions] = useMutation(
    SEND_PASSWORD_RESET_CONFIRMATION_MUTATION
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
                error={getLoginError(userLoginOptions.error)}
                hideLoginForm={() => setHideLoginForm(true)}
                handleSubmit={(options) => {
                  userLogin(options)
                    .then(({data}) => {
                      authenticateUser(data.userLogin.token)
                    })
                    .catch((err) => console.log('Login error'))
                }}
              />
            ),
            forgetMyPassword: (
              <ForgotMyPasswordForm
                showLoginForm={() => setHideLoginForm(false)}
                handleSubmit={(options) => {
                  sendPasswordResetConfirmation(options)
                    .catch(() => console.log('error'))
                }}
                error={sendPasswordResetConfirmationOptions.error}
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
                error={verifyEmailOptions.error}
                handleSubmit={(options) => {
                  verifyEmail(options)
                    .catch(() => console.log('error'))
                }}
              />
            ),
            success: (
              <Col id="LoginSuccess">
                <h3>Please check your email.</h3>
              </Col>
            ),
          }[getLoginStatus(
            hideLoginForm,
            userLoginOptions,
            verifyEmailOptions,
            sendPasswordResetConfirmationOptions,
          )]
        }
      </Row>
    </Container>
  )
}
