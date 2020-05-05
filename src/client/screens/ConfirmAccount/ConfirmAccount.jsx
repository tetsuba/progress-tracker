import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

// COMPONENTS
import { Col, Container, Row } from 'react-bootstrap'
import EmailVerificationForm from '../../components/Form/EmailVerificationForm'
import Loading from '../../components/Loading/Loading'

// QUERY
import { VALIDATE_USER_EMAIL_QUERY } from '../../api/user/user.query'

// TYPES
type Props = {
  pageState: string,
}

export default function ConfirmAccount(props: Props) {
  const { token } = useParams()
  const variables = { token: token ? decodeURIComponent(token) : '' }
  const { error, data } = useQuery(VALIDATE_USER_EMAIL_QUERY, { variables })
  const [pageState, setPageSate] = useState(props.pageState)

  useEffect(() => {
    if (data) setPageSate('accountVerified')
    if (error) setPageSate('tokenExpired')
  }, [error, data])

  return (
    <Container className="pt-5">
      <Row>
        {
          {
            loading: <Loading />,
            tokenExpired: (
              <EmailVerificationForm
                setPageState={(state) => setPageSate(state)}
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
          }[pageState]
        }
      </Row>
    </Container>
  )
}

ConfirmAccount.defaultProps = {
  pageState: 'loading',
}
