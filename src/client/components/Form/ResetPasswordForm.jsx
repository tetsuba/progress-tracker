import React, { useState } from 'react';

import { Button, Form, Row } from 'react-bootstrap';
import PasswordStrength from "../PasswordStrength/PasswordStrength";
import {handleInputChange, passwordMatchError, passwordsMatched} from "./form-utils";

const ResetPasswordForm = ({ userId }) => {
    const [inputs, setInputs] = useState({password1: '', password2: ''});
    const [error] = useState({message: ''});

    console.log('userId:', userId)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputs.password1 !== inputs.password2) {
            return;
        }

        // sendPasswordResetConfirmation({ variables: { input: inputs } })
        //     .then(({ data }) => {
        //         setSuccess(data.sendPasswordResetConfirmation.confirmation)
        //     })
        //     .catch((error) => {
        //         const message = error.graphQLErrors[0].message;
        //         setError({ message })
        //     })
    };

    return (
        <Row>
            <Form
                className="w-100"
                onSubmit={(e) => handleSubmit(e)}
            >
                <Form.Group controlId="formPassword1">
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password1"
                        onChange={(e) => handleInputChange(e, setInputs)}
                        value={inputs.password1}
                    />
                    <Form.Control.Feedback type="invalid">
                        { error.message }
                    </Form.Control.Feedback>
                    <PasswordStrength password={inputs.password1}  />
                </Form.Group>
                <Form.Group controlId="formPassword2">
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password2"
                        onChange={(e) => handleInputChange(e, setInputs)}
                        value={inputs.password2}
                        isInvalid={passwordMatchError(inputs)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Password does not match!!!
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        { `Matching password ${inputs.password2.length} of ${inputs.password1.length }` }
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={passwordsMatched(inputs)}>
                    Reset Password
                </Button>
            </Form>
        </Row>
    )
};

export default ResetPasswordForm
