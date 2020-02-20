import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const LoginForm = ({handleSubmit, error}) => {
    const [inputs, setInputs] = useState({
        email: 'test@test.com', password: '1234'
    });

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs =>
            ({...inputs, [event.target.name]: event.target.value}));
    };

    return (
        <Form onSubmit={(e) => handleSubmit(e, inputs)}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleInputChange}
                    value={inputs.email}
                    isInvalid={!!error.email}
                />
                <Form.Control.Feedback type="invalid">
                    {error.email && error.email.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputChange}
                    value={inputs.password}
                    isInvalid={!!error.password}
                />
                <Form.Control.Feedback type="invalid">
                    {error.password && error.password.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="float-right">
                Submit
            </Button>
        </Form>
    )
};

export default LoginForm;
