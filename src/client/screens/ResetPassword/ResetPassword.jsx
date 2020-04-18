import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'

// QUERIES
import { CONFIRM_TOKEN_QUERY } from '../../api/token/token.query'

// MUTATIONS
import {
  REST_PASSWORD_MUTATION,
  SEND_PASSWORD_RESET_CONFIRMATION_MUTATION,
} from '../../api/user/user.mutation'

// COMPONENTS
import Loading from '../../components/Loading/Loading'
import ForgotMyPasswordForm from '../../components/Form/ForgotMyPasswordForm'
import ResetPasswordForm from '../../components/Form/ResetPasswordForm'

// UTILS
import { getRestPasswordStatus } from '../../components/Form/form-utils'

export default function ResetPassword() {
  let { token } = useParams()
  token = decodeURIComponent(token)
  const variables = { token }
  const confirmation = useQuery(CONFIRM_TOKEN_QUERY, { variables })
  const [resetPassword, resetPasswordOptions] = useMutation(
    REST_PASSWORD_MUTATION
  )
  const [
    sendPasswordResetConfirmation,
    sendPasswordResetConfirmationOptions,
  ] = useMutation(SEND_PASSWORD_RESET_CONFIRMATION_MUTATION)

  return (
    <Container className="pt-5">
      {
        {
          loading: <Loading />,
          form: (
            <ResetPasswordForm
              handleSubmit={(options) => {
                resetPassword(options).catch(() => console.log('error'))
              }}
              token={token}
            />
          ),
          success: (
            <Row>
              <Col>
                <h3 id="ResetPasswordSuccess">
                  Password updated. Please <Link to="/login">click here</Link>{' '}
                  to login
                </h3>
              </Col>
            </Row>
          ),
          /* token expired */
          error: (
            <ForgotMyPasswordForm
              handleSubmit={(options) => {
                sendPasswordResetConfirmation(options).catch(() =>
                  console.log('error')
                )
              }}
              error={sendPasswordResetConfirmationOptions.error}
            >
              <h3 className="text-danger">This session has expired!</h3>
              <p>
                Enter your email address and we will send you a link to reset
                your password.
              </p>
            </ForgotMyPasswordForm>
          ),
        }[
          getRestPasswordStatus(
            confirmation,
            resetPasswordOptions,
            sendPasswordResetConfirmationOptions
          )
        ]
      }
    </Container>
  )
}
