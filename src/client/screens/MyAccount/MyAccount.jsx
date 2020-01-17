import React, {Fragment, useContext, useState} from 'react';

// COMPONENTS
import {Col, Container, Row, Button, Form} from 'react-bootstrap';
import {BreadCrumbs} from '../../components/BreadCrumbs/BreadCrumbs';

// CONTEXT
import { UserContext } from '../../context/UserContext';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER_MUTATION } from './MyAccount.mutation';

const MyAccount = () => {
    const [updateUserData] = useMutation(UPDATE_USER_MUTATION);
    const {firstName, lastName, userId, email, userUpdate} = useContext(UserContext);
    const [data, setData] = useState({showForm: false});
    const [userInputs, setUserInputs] = useState({firstName: firstName, lastName: lastName});
    const crumbs = [
        { path: '/', name: 'Home' },
        { path: '', name: 'My Account' },
    ];

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setUserInputs(userInputs => ({
            ...userInputs,
            [name]: value
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        const input = {
            ...userInputs,
            id: userId,
        };

        updateUserData({ variables: { input } })
            .then(({data}) => {
                // userUpdate(data.updateUserData);
                setData({showForm: false})
            })
            .catch((error) => {
                console.log('Login error', error.graphQLErrors)
            })
    }

    return (
        <Container>
            <Row>
                <Row className="mt-5">
                    <BreadCrumbs crumbs={crumbs} />
                </Row>
            </Row>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group as={Row} controlId="formPlaintextFirstName">
                    <Form.Label column sm="2">
                        First Name:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            required
                            type="text"
                            name="firstName"
                            placeholder={firstName}
                            onChange={handleInputChange}
                            value={userInputs.firstName}
                            readOnly={!data.showForm}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Last Name:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            required
                            type="input"
                            name="lastName"
                            placeholder={lastName}
                            value={userInputs.lastName}
                            onChange={handleInputChange}
                            readOnly={!data.showForm}
                        />
                    </Col>
                </Form.Group>
                {
                    data.showForm
                        ? (
                            <Fragment>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setUserInputs({firstName, lastName});
                                        setData(data => ({...data, showForm: false}))
                                    }}
                                >Cancel</Button>
                                <Button variant="primary" type="submit">Save</Button>
                            </Fragment>
                        )
                        : <Button
                            variant="primary"
                            onClick={() => setData(data => ({...data, showForm: true}))}
                        >Edit</Button>
                }
            </Form>

            <Row className="mt-4">
                <Col>
                    Email:
                </Col>
                <Col>
                    { email }
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    Password:
                </Col>
                <Col>
                    ###########
                </Col>
            </Row>
        </Container>
    )
};

export default MyAccount;
