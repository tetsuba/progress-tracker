import React, { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

// COMPONENTS
import { Col, Container, Row } from 'react-bootstrap'
import EmailVerificationForm from '../../components/Form/EmailVerificationForm'

// QUERY
import { CONFIRM_ACCOUNT_QUERY } from '../../api/token/token.query'

const ConfirmAccount = () => {
  let { token } = useParams()
  token = decodeURIComponent(token)
  const variables = { token }
  const { data, error } = useQuery(CONFIRM_ACCOUNT_QUERY, { variables })

  return (
    <Container>
      <Row className="mt-5">
        <Col className="text-center">
          {data && (
            <Fragment>
              <h1>Account Verified</h1>
              <p>Please log into your account</p>
              <Link to="/login">Login</Link>
            </Fragment>
          )}
          {error && (
            <Fragment>
              <h1>Account verification expired</h1>
              <p>
                Please enter your email address and send another validation
                email
              </p>
              <EmailVerificationForm />
            </Fragment>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ConfirmAccount
