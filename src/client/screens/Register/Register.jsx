import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';

import gql from 'graphql-tag';
import { UserContext } from '../../context/UserContext';

const AddNewUserMutation = gql`
    mutation NewUser($input: NewUserInput!) {
        newUser(input: $input) {
            id
        }
    }
`;

const Register = () => {
    const { addUserId, loggedIn } = useContext(UserContext);
    const [inputs, setInputs] = useState({});
    const [addNewUser] = useMutation(AddNewUserMutation);

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewUser({ variables: { input: inputs } })
            .then(({ data }) => {
                addUserId(data.newUser.id)
            })
            .catch((err) => console.log(err))
    };

    if (loggedIn) {
        return <Redirect to="/myAccount"/>
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <h1>Register</h1>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={handleInputChange}
                                    value={inputs.email}
                                    name="email"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                    value={inputs.password}
                                    name="password"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    placeholder="First Name"
                                    onChange={handleInputChange}
                                    value={inputs.firstName}
                                    name="firstName"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    placeholder="Last Name"
                                    onChange={handleInputChange}
                                    value={inputs.lastName}
                                    name="lastName"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridCountry">
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
                </Col>
            </Row>
        </Container>
    )
};

export default Register;
