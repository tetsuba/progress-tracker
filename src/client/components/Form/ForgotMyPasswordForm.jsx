import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, Row, Col } from 'react-bootstrap';

// MUTATIONS
import { SEND_PASSWORD_RESET_CONFIRMATION_MUTATION } from '../../api/user/user.mutation';

// ICONS
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft} from "@fortawesome/free-solid-svg-icons";

// COMPONENT
import TextLink from "../TextLink/TextLink";
import {useError, useInputChange, useSuccess} from "../../hooks/hooks";

const ForgotMyPasswordForm = ({ defaultEmail = '', resetPassword}) => {
    const [ sendPasswordResetConfirmation ] = useMutation(SEND_PASSWORD_RESET_CONFIRMATION_MUTATION);
    const [inputs, setInputs] = useInputChange({ email: defaultEmail });
    const [error, setError] = useError({ message: '' });
    const [success, setSuccess] = useSuccess('sendPasswordResetConfirmation');
    const options = { variables: { input: inputs } };

    return success
        ? (
            <Row>
                <h3>Please check your email.</h3>
            </Row>
        )
        :(
            <Col>
                <Row>
                    <h3>Forgot my password</h3>
                </Row>
                <Row>
                    <p>Enter your email address and we will send you a link to reset your password.</p>
                </Row>
                <Row>
                    <Form
                        id="ForgotMyPasswordForm"
                        className="w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendPasswordResetConfirmation(options)
                                .then(setSuccess)
                                .catch(setError)
                        }}
                    >
                        <Form.Group controlId="forgotMyPasswordEmail">
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={setInputs}
                                value={inputs.email}
                                isInvalid={!!error.message}
                            />
                            <Form.Control.Feedback type="invalid">
                                {error.message}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Button id="ForgotMyPasswordSubmit" variant="primary" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                </Row>
                { resetPassword && (
                    <Row className="mt-3">
                        <TextLink eventHandler={resetPassword}>
                            <FontAwesomeIcon icon={faCaretLeft} /> back
                        </TextLink>
                    </Row>
                )}

            </Col>
        )
};

export default ForgotMyPasswordForm;
