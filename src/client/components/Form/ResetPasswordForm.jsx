import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';

// UTILS
import { passwordMatchError, passwordsDoNotMatched } from "./form-utils";

// HOOKS
import { useInputChange } from "../../hooks/hooks";

// COMPONENTS
import PasswordStrength from "../PasswordStrength/PasswordStrength";

const ResetPasswordForm = ({ resetPassword, token }) => {
    const [inputs, setInputs] = useInputChange({password1: '', password2: ''});

    const options = {
        variables: {
            input: {
                token: token,
                password: inputs.password1
            }
        }
    };
    const passwordMissMatchError = passwordMatchError(inputs);

    return (
        <>
            <Row className="mt-5">
                <h1>Reset Password</h1>
            </Row>
            <Row>
                <Form
                    id="ResetPasswordForm"
                    className="w-100"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (inputs.password1 !== inputs.password2) return;
                        resetPassword(options)
                    }}
                >
                    <Form.Group controlId="formPassword1">
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            name="password1"
                            onChange={setInputs}
                            value={inputs.password1}
                        />
                        <PasswordStrength password={inputs.password1}  />
                    </Form.Group>
                    <Form.Group controlId="formPassword2">
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            name="password2"
                            onChange={setInputs}
                            value={inputs.password2}
                            isInvalid={passwordMissMatchError}
                        />
                        <Form.Control.Feedback type="invalid">
                            { passwordMissMatchError && 'Password does not match!!!' }
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            { `Matching password ${inputs.password2.length} of ${inputs.password1.length }` }
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={passwordsDoNotMatched(inputs)}>
                        Reset Password
                    </Button>
                </Form>
            </Row>
        </>
    )
};

export default ResetPasswordForm
