import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

// COMPONENTS
import Loading from '../../components/Loading/Loading'
import ForgotMyPasswordForm from '../../components/Form/ForgotMyPasswordForm'
import ResetPasswordForm from '../../components/Form/ResetPasswordForm'

// QUERIES
import { CONFIRM_TOKEN_QUERY } from '../../api/token/token.query'

// TYPES
type Props = {
  pageState: string,
}

export default function ResetPassword(props: Props) {
  const { token } = useParams()
  const variables = { token: token ? decodeURIComponent(token) : '' }
  const { error, data } = useQuery(CONFIRM_TOKEN_QUERY, { variables })
  const [pageState, setPageSate] = useState(props.pageState)

  useEffect(() => {
    if (data) setPageSate('form')
    if (error) setPageSate('error')
  }, [error, data])

  return (
    <Container className="pt-5">
      {
        {
          loading: <Loading />,
          form: (
            <ResetPasswordForm
              setPageState={(state) => setPageSate(state)}
              token={token || ''}
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
            <ForgotMyPasswordForm setPageState={(state) => setPageSate(state)}>
              <h3 className="text-danger">This session has expired!</h3>
              <p>
                Enter your email address and we will send you a link to reset
                your password.
              </p>
            </ForgotMyPasswordForm>
          ),
        }[pageState]
      }
    </Container>
  )
}

ResetPassword.defaultProps = {
  pageState: 'loading',
}
