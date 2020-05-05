import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// COMPONENTS
import EmailVerificationForm from '../../components/Form/EmailVerificationForm'
import ForgotMyPasswordForm from '../../components/Form/ForgotMyPasswordForm'
import Loading from '../../components/Loading/Loading'
import LoginForm from '../../components/Form/LoginForm'

// TYPES
type Props = {
  pageState: string,
}

export default function Login(props: Props) {
  const [pageState, setPageState] = useState(props.pageState)
  return (
    <Container className="pt-5">
      <Row>
        {
          {
            loading: <Loading />,
            login: <LoginForm setPageState={setPageState} />,
            forgetMyPassword: (
              <ForgotMyPasswordForm setPageState={setPageState}>
                <h3>Forgot my password</h3>
                <p>
                  Enter your email address and we will send you a link to reset
                  your password.
                </p>
              </ForgotMyPasswordForm>
            ),
            emailNotVerified: (
              <EmailVerificationForm setPageState={setPageState}>
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
          }[pageState]
        }
      </Row>
    </Container>
  )
}

Login.defaultProps = {
  pageState: 'login',
}
