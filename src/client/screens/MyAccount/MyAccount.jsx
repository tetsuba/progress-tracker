// TODO: verify email and update email address
//  https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb

// TODO: Change password


import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

// COMPONENTS
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import Loading from '../../components/Loading/Loading';

// FORM
import MyAccountForm from '../../components/Form/MyAccountForm';

// QUERY
import { GET_USER_QUERY } from '../../api/user/user.query';

// MUTATION
import { UPDATE_USER_MUTATION } from './MyAccount.mutation';

// BREADCRUMBS
const crumbs = [
    { path: '/', name: 'Home' },
    { path: '', name: 'My Account' },
];

const MyAccount = () => {
    const [formElement, setFormElement] = useState({ show: false });
    const { loading, data } = useQuery(GET_USER_QUERY);
    const [updateUserData] = useMutation(
        UPDATE_USER_MUTATION,
        {
            refetchQueries: [{query: GET_USER_QUERY}]
        }
    );

    function handleSubmit(e, inputs) {
        e.preventDefault();
        const input = {
            ...inputs,
            id: data.getUserData.id,
        };

        updateUserData({ variables: { input } })
            .then(() => {
                setFormElement({show: false})
            })
            .catch((error) => {
                console.log('Login error', error.graphQLErrors)
                // TODO: Setup error handling for this form.
            })
    }

    if (loading) return <Loading />;
    const { getUserData: user } = data;

    return (
        <Container>
            <Row>
                <Row className="mt-5">
                    <BreadCrumbs crumbs={crumbs} />
                </Row>
            </Row>

            <MyAccountForm
                handleSubmit={handleSubmit}
                user={user}
                showForm={formElement.show}
                setShowForm={setFormElement}
            />

            <Row className="mt-5">
                <Col>
                    Email:
                </Col>
                <Col>
                    { user.email }
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
