import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

// COMPONENTS
import { Container, Row } from 'react-bootstrap'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import Loading from '../../components/Loading/Loading'

// FORM
import MyDetailsForm from '../../components/Form/MyDetailsForm'

// QUERY
import { GET_USER_DETAILS_QUERY } from '../../api/user/user.query'

// MUTATION
import { UPDATE_USER_DETAILS_MUTATION } from '../../api/user/user.mutation'

// COMPONENTS
import Box from '../../components/Box/Box'
import ForgotMyPasswordForm from '../../components/Form/ForgotMyPasswordForm'

// BREADCRUMBS
const crumbs = [
  { path: '/', name: 'Home' },
  { path: '', name: 'My Account' },
]

export default function MyAccount() {
  const [formElement, setFormElement] = useState({ show: false })
  const { loading, data } = useQuery(GET_USER_DETAILS_QUERY)
  const [updateUserDetails] = useMutation(UPDATE_USER_DETAILS_MUTATION, {
    refetchQueries: [{ query: GET_USER_DETAILS_QUERY }],
  })

  function handleSubmit(e, inputs) {
    e.preventDefault()
    const input = {
      ...inputs,
      id: data.getUserDetails.id,
    }

    updateUserDetails({ variables: { input } })
      .then(() => {
        setFormElement({ show: false })
      })
      .catch((error) => {
        console.log('Login error', error.graphQLErrors)
        // TODO: Setup error handling for this form.
      })
  }

  if (loading) return <Loading />
  const { getUserDetails: user } = data

  return (
    <Container className="pt-5">
      <BreadCrumbs crumbs={crumbs} />

      <MyDetailsForm
        handleSubmit={handleSubmit}
        user={user}
        showForm={formElement.show}
        setShowForm={setFormElement}
      />

      <Row className="mt-5">
        <ForgotMyPasswordForm
          hideEmailInput
          defualtEmail={user.email}
          buttonText="Send"
        >
          <h3>Request for a password reset</h3>
          <p>We will send you a link to reset your password.</p>
        </ForgotMyPasswordForm>
      </Row>

      <Row className="mt-5">
        <Box max={500}>
          <h3>Email - Changing email address is not available</h3>
          <p>{user.email}</p>
        </Box>
      </Row>
    </Container>
  )
}
