import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Col, Container, Row } from 'react-bootstrap'

import RegisterForm from '../../components/Form/RegisterForm'
import { REGISTER_USER_MUTATION } from '../../api/user/user.mutation'

const Register = () => {
  const [addNewUser] = useMutation(REGISTER_USER_MUTATION)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    message: '',
  })

  const handleSubmit = (e, inputs) => {
    e.preventDefault()
    addNewUser({ variables: { input: inputs } })
      .then(({ data }) => {
        setSuccess(true)
      })
      .catch((err) => {
        const error = err.graphQLErrors[0]
        console.log(error)

        if (error.name === 'email_already_exist') {
          setErrors({
            ...error,
            email: error.message,
          })
        }
      })
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Register</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          {success ? (
            <h3>Please check your email to validate your email address.</h3>
          ) : (
            <RegisterForm handleSubmit={handleSubmit} errors={errors} />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Register
