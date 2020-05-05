import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

// COMPONENTS
import { Container, Row } from 'react-bootstrap'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import MyDetailsForm from '../../components/Form/MyDetailsForm'

// QUERY
import { GET_USER_DETAILS_QUERY } from '../../api/user/user.query'

// MUTATION
import { UPDATE_USER_DETAILS_MUTATION } from '../../api/user/user.mutation'

// COMPONENTS
import Box from '../../components/Box/Box'
import ForgotMyPasswordForm from '../../components/Form/ForgotMyPasswordForm'
import Loading from '../../components/Loading/Loading'

// BREADCRUMBS
const crumbs = [
  { path: '/', name: 'Home' },
  { path: '', name: 'My Account' },
]

export default function MyAccount(props) {
  const { loading, data } = useQuery(GET_USER_DETAILS_QUERY)
  const [updateUserDetails, updateUserDetailsOptions] = useMutation(
    UPDATE_USER_DETAILS_MUTATION,
    {
      refetchQueries: [{ query: GET_USER_DETAILS_QUERY }],
    }
  )
  const [pageState, setPageState] = useState(props.pageState)

  console.log('MyAccount', data)

  return loading ? (
    <Loading />
  ) : (
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
        {
          {
            resetPassword: (
              <ForgotMyPasswordForm
                setPageState={(state) => setPageState(state)}
                hideEmailInput
                defaultEmail={data.getUserDetails.email}
                buttonText="Send"
              >
                <h3>Request for a password reset</h3>
                <p>We will send you a link to reset your password.</p>
              </ForgotMyPasswordForm>
            ),
            success: (
              <Box
                max={500}
                className="MyAccountResetPasswordSuccess border-success"
              >
                <h3>Please check your email</h3>
                <p>Click on the link to reset your password.</p>
              </Box>
            ),
          }[pageState]
        }
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

MyAccount.defaultProps = {
  pageState: 'resetPassword',
}
