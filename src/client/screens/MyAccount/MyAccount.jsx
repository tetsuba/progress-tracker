import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

// COMPONENTS
import { Container, Row } from 'react-bootstrap'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'

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
  const { loading, data } = useQuery(GET_USER_DETAILS_QUERY)
  const [updateUserDetails, updateUserDetailsOptions] = useMutation(
    UPDATE_USER_DETAILS_MUTATION,
    {
      refetchQueries: [{ query: GET_USER_DETAILS_QUERY }],
    }
  )

  if (loading) {
    return <div>Page Loader</div>
  }

  return (
    <Container className="pt-5">
      <BreadCrumbs crumbs={crumbs} />
      <MyDetailsForm
        handleSubmit={(options, setShowFormElement) => {
          updateUserDetails(options)
            .then(() => setShowFormElement(false))
            .catch(() => console.log('Error!'))
        }}
        error={updateUserDetailsOptions.error}
        user={data.getUserDetails}
      />

      <Row className="mt-5">
        <ForgotMyPasswordForm
          hideEmailInput
          defualtEmail={data.getUserDetails.email}
          buttonText="Send"
        >
          <h3>Request for a password reset</h3>
          <p>We will send you a link to reset your password.</p>
        </ForgotMyPasswordForm>
      </Row>

      <Row className="mt-5">
        <Box max={500}>
          <h3>Email - Changing email address is not available</h3>
          <p>{data.getUserDetails.email}</p>
        </Box>
      </Row>
    </Container>
  )
}
