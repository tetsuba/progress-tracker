import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'

// COMPONENTS
import { Col, Container, Row } from 'react-bootstrap'
import EmailVerificationForm from '../../components/Form/EmailVerificationForm'

// QUERY
import { VALIDATE_USER_EMAIL_QUERY } from '../../api/user/user.query'
import { VERIFY_USER_EMAIL_MUTATION } from '../../api/user/user.mutation'
import { getConfirmAccountStatus } from '../../components/Form/form-utils'

export default function ConfirmAccount() {
  let { token } = useParams()
  token = decodeURIComponent(token)
  const variables = { token }
  const confirmToken = useQuery(VALIDATE_USER_EMAIL_QUERY, { variables })
  const [verifyUserEmail, verifyUserEmailOptions] = useMutation(
    VERIFY_USER_EMAIL_MUTATION
  )

  return (
    <Container className="pt-5">
      <Row>
        {
          {
            tokenExpired: (
              <EmailVerificationForm
                error={verifyUserEmailOptions.error}
                handleSubmit={(options) => {
                  verifyUserEmail(options).catch(() => console.log('error'))
                }}
              >
                <h3 className="text-danger">
                  Email verification session expired
                </h3>
                <p>
                  Please enter your email address below and a link will be sent
                  to confirm your email address.
                </p>
              </EmailVerificationForm>
            ),
            accountVerified: (
              <Col className="text-center">
                <h3>Email Verified</h3>
                <p>Please log into your account</p>
                <Link to="/login">Login</Link>
              </Col>
            ),
            success: (
              <Col id="LoginSuccess">
                <h3>Please check your email.</h3>
              </Col>
            ),
            default: <div></div>,
          }[getConfirmAccountStatus(confirmToken, verifyUserEmailOptions)]
        }
      </Row>
    </Container>
  )
}
