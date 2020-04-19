import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Col, Container, Row } from 'react-bootstrap'

// COMPONENTS
import Loading from '../../components/Loading/Loading';
import RegisterForm from '../../components/Form/RegisterForm'

// MUTATIONS
import { REGISTER_USER_MUTATION } from '../../api/user/user.mutation'

// UTILS
import { getRegistrationStatus } from '../../components/Form/form-utils';

export default function Register() {
  const [addNewUser, addNewUserOptions] = useMutation(REGISTER_USER_MUTATION)
  // TODO: loading spinner not ideal. Look for another solution
  return (
    <Container className="pt-5">
      {addNewUserOptions.loading && <Loading fade={addNewUserOptions.loading}/>}
      {
        {
          register: (
            <RegisterForm
              error={addNewUserOptions.error}
              handleSubmit={(options) => {
                addNewUser(options)
                  .catch((err) => console.log('error'))
              }}
            />
          ),
          success: (
            <Row>
              <Col>
                <h3 id="Success">
                  Please check your email to validate your email address.
                </h3>
              </Col>
            </Row>
          ),
        }[getRegistrationStatus(addNewUserOptions)]
      }
    </Container>
  )
}
