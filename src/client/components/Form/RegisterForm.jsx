import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

const RegisterForm = ({ handleSubmit, errors }) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    };

    return (
        <Form onSubmit={(e) => handleSubmit(e, inputs)}>
            <Form.Row>
                <Form.Group as={Col} controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={handleInputChange}
                        value={inputs.email}
                        name="email"
                        required
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={inputs.password}
                        name="password"
                        required
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        placeholder="First Name"
                        onChange={handleInputChange}
                        value={inputs.firstName}
                        name="firstName"
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        value={inputs.lastName}
                        name="lastName"
                        required
                    />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formCountry">
                <Form.Label>State</Form.Label>
                <Form.Control
                    as="select"
                    value={inputs.country}
                    onChange={handleInputChange}
                    name="country"
                >
                    <option>Choose...</option>
                    <option>UK</option>
                    <option>ASIA</option>
                    <option>AFRICA</option>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
};

export default RegisterForm;
