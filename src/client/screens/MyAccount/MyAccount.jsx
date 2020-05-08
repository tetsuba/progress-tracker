import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Container, Row } from 'react-bootstrap'

// COMPONENTS
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import Box from '../../components/Box/Box'
import ForgotMyPasswordForm from '../../components/Form/ForgotMyPasswordForm'
import Loading from '../../components/Loading/Loading'
import MyDetailsForm from '../../components/Form/MyDetailsForm'
import { CRUMBS_KEY } from '../../components/BreadCrumbs/crumbs'

// QUERY
import { GET_USER_DETAILS_QUERY } from '../../api/user/user.query'

type Props = {
  pageState: string,
}

export default function MyAccount(props: Props) {
  // $FlowFixMe - Passing query data to a child component throws an error
  const { loading, data } = useQuery(GET_USER_DETAILS_QUERY)
  const [pageState, setPageState] = useState(props.pageState)

  return loading ? (
    <Loading />
  ) : (
    <Container className="pt-5">
      <BreadCrumbs crumbKey={CRUMBS_KEY.MY_ACCOUNT} />
      <MyDetailsForm user={data.getUserDetails} />

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
