import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import { SEND_PASSWORD_RESET_CONFIRMATION_MUTATION } from '../../api/user/user.mutation';

const EmailPasswordResetForm = ({ defaultEmail = ''}) => {
    const [ sendPasswordResetConfirmation ] = useMutation(SEND_PASSWORD_RESET_CONFIRMATION_MUTATION);
    const [inputs, setInputs] = useState({email: defaultEmail});
    const [error, setError] = useState({message: ''});
    const [success, setSuccess] = useState('');

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => (
            {...inputs, [event.target.name]: event.target.value})
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        sendPasswordResetConfirmation({ variables: { input: inputs } })
            .then(({ data }) => {
                setSuccess(data.sendPasswordResetConfirmation.confirmation)
            })
            .catch((error) => {
                const message = error.graphQLErrors[0].message;
                setError({ message })
            })
    };

    return success
        ? (
            <Row>
                <h3>Please check your email.</h3>
            </Row>
        )
        :(
            <>
                <Row>
                    <h3>Reset your password</h3>
                </Row>
                <Row>
                    <Form
                        id="restPasswordForm"
                        className="w-100"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                id="resetPasswordEmail"
                                required
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={handleInputChange}
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
                        <Button id="resetPasswordSubmit" variant="primary" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                </Row>
            </>
        )
};

export default EmailPasswordResetForm
