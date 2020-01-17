import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { LOGIN_MUTATION } from './Login.mutation';
import {AuthenticatedContext} from '../../context/AuthenticatedContext';

const Login = () => {
    const [ userLogin, { loading: mutationLoading }] = useMutation(LOGIN_MUTATION);
    const { toggle: authenticateUser } = useContext(AuthenticatedContext);
    const { userLoggedIn } = useContext(UserContext);

    const [inputs, setInputs] = useState({email: 'test@test.com', password: '1234'});
    const [error, setError] = useState({email: '', password: '',});

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        userLogin({ variables: { input: inputs } })
            .then(({ data }) => {
                console.log(data);
                userLoggedIn(data.userLogin);
                authenticateUser(true);
                localStorage.setItem('ptToken', data.userLogin.token)
            })
            .catch((error) => {
                console.log('Login error', error.graphQLErrors);

                if (error.graphQLErrors[0]) {
                    setError({
                        email: error.graphQLErrors[0].message,
                        password: error.graphQLErrors[0].message,
                    })
                }

            })
    };

    if (mutationLoading) return <div>Loading</div>

    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <h1>Login</h1>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Form onSubmit={(e) => handleSubmit(e)}>
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
                                {error.email}
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
                                {error.password}
                            </Form.Control.Feedback>
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

export default Login;
