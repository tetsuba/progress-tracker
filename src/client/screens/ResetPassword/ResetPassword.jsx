import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'

// QUERIES
import { CONFIRM_TOKEN_QUERY } from '../../api/token/token.query'

// MUTATIONS
import { REST_PASSWORD_MUTATION } from '../../api/user/user.mutation'

// COMPONENTS
import Loading from '../../components/Loading/Loading'
import ForgotMyPasswordForm from '../../components/Form/ForgotMyPasswordForm'
import ResetPasswordForm from '../../components/Form/ResetPasswordForm'

// UTILS
import { getRestPasswordStatus } from '../../components/Form/form-utils'
import Box from '../../components/Box/Box';

export default function ResetPassword() {
  let { token } = useParams()
  token = decodeURIComponent(token)
  const variables = { token }
  const confirmation = useQuery(CONFIRM_TOKEN_QUERY, { variables })
  const [resetPassword, resetPasswordOptions] = useMutation(
    REST_PASSWORD_MUTATION
  )

  return (
    <Container className="pt-5">
      {
        {
          loading: <Loading />,
          form: (
              <ResetPasswordForm
                resetPassword={resetPassword}
                token={token}
              />
          ),
          success: (
            <Row>
              <Col>
                <h3 id="ResetPasswordSuccess">
                  Password updated. Please <Link to="/login">click here</Link> to
                  login
                </h3>
              </Col>
            </Row>
          ),
          /* token expired */
          error: (
            <ForgotMyPasswordForm>
              <h3 class="text-danger">
                This session has expired!
              </h3>
              <p>
                Enter your email address and we will send
                you a link to reset your password.
              </p>
            </ForgotMyPasswordForm>
          ),
        }[getRestPasswordStatus(confirmation, resetPasswordOptions)]
      }
    </Container>
  )
}
