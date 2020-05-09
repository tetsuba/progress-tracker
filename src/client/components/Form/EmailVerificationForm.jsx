import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Col } from 'react-bootstrap'

// CONTEXT
// $FlowFixMe - Investigate how to fix context flow issue
import { LoadingContext } from '../../context/LoadingContext'

// COMPONENTS
import Box from '../Box/Box'

// HOOKS
import { useInputChange } from '../../hooks/hooks'
import { useMutation } from '@apollo/react-hooks'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'

// MUTATIONS
import { VERIFY_USER_EMAIL_MUTATION } from '../../api/user/user.mutation'

type Props = {
  children: React.Node,
  setPageState: (string) => void,
}

export default function EmailVerificationForm(props: Props) {
  const { children, setPageState } = props
  const { showLoading, hideLoading } = React.useContext(LoadingContext)
  const [inputs, setInputs] = useInputChange({ email: '' })
  const [verifyUserEmail] = useMutation(VERIFY_USER_EMAIL_MUTATION)
  const [errorMessage, setErrorMessage] = React.useState('')
  const options = { variables: { input: inputs } }

  return (
    <Box max={500}>
      <Col>
        {children}
        <Form
          id="EmailVerificationForm"
          onSubmit={(e) => {
            e.preventDefault()
            showLoading()
            verifyUserEmail(options)
              .then(() => {
                hideLoading()
                setPageState('success')
              })
              .catch(({ graphQLErrors }) => {
                hideLoading()
                setErrorMessage(graphQLErrors[0].message)
              })
          }}
        >
          <Form.Group controlId="EmailVerificationEmail">
            <Form.Control
              required
              type="email"
              placeholder="email@address.com"
              name="email"
              onChange={setInputs}
              value={inputs.email}
              isInvalid={!!errorMessage}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Button
            id="EmailVerificationSubmit"
            className="float-right"
            variant="primary"
            type="submit"
          >
            Send
          </Button>
        </Form>
        {setPageState && (
          <Link to="/">
            <FontAwesomeIcon icon={faCaretLeft} /> back
          </Link>
        )}
      </Col>
    </Box>
  )
}
