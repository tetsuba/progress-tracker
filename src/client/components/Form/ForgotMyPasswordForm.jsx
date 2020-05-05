import * as React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'

// COMPONENT
import TextLink from '../TextLink/TextLink'
import Box from '../Box/Box'

// HOOKS
import { useMutation } from '@apollo/react-hooks'
import { useInputChange } from '../../hooks/hooks'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'

// MUTATIONS
import { REQUEST_PASSWORD_RESET_MUTATION } from '../../api/user/user.mutation'

type Props = {
  children: React.Node,
  setPageState: (string) => void,
  defaultEmail?: string,
}

export default function ForgotMyPasswordForm(props: Props) {
  const { children, setPageState, defaultEmail = '' } = props
  const [requestPasswordReset] = useMutation(REQUEST_PASSWORD_RESET_MUTATION)
  const [inputs, setInputs] = useInputChange({ email: defaultEmail })
  const [errorMessage, setErrorMessage] = React.useState('')
  const options = { variables: { input: inputs } }

  return (
    <Box max={500}>
      <Row>
        <Col>
          {children}
          <Form
            id="ForgotMyPasswordForm"
            className="w-100"
            onSubmit={(e) => {
              e.preventDefault()
              requestPasswordReset(options)
                .then(() => setPageState('success'))
                .catch(({ graphQLErrors }) => {
                  setErrorMessage(graphQLErrors[0].message)
                })
            }}
          >
            <Form.Group controlId="ForgotMyPasswordEmail">
              <Form.Control
                required
                type="email"
                placeholder={defaultEmail ? defaultEmail : '@'}
                name="email"
                onChange={setInputs}
                value={inputs.email}
                isInvalid={!!errorMessage}
                readOnly={!!defaultEmail}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                {!defaultEmail &&
                  "We'll never share your email with anyone else."}
              </Form.Text>
            </Form.Group>
            <Button
              id="ForgotMyPasswordSubmit"
              className="float-right"
              variant="primary"
              type="submit"
            >
              Reset Password
            </Button>
          </Form>
          {setPageState && (
            <TextLink eventHandler={() => setPageState('login')}>
              <FontAwesomeIcon icon={faCaretLeft} /> back
            </TextLink>
          )}
        </Col>
      </Row>
    </Box>
  )
}
