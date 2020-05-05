import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// COMPONENTS
import RegisterForm from '../../components/Form/RegisterForm'

type Props = {
  pageState: string,
}

export default function Register(props: Props) {
  const [pageState, setPageState] = useState(props.pageState)
  return (
    <Container className="pt-5">
      {
        {
          register: <RegisterForm setPageState={setPageState} />,
          success: (
            <Row>
              <Col>
                <h3 id="Success">
                  Please check your email to validate your email address.
                </h3>
              </Col>
            </Row>
          ),
        }[pageState]
      }
    </Container>
  )
}

Register.defaultProps = {
  pageState: 'register',
}
