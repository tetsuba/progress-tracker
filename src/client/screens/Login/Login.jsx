import React, { useState, useContext, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { AuthenticatedContext } from '../../context/AuthenticatedContext';
import { LOGIN_MUTATION } from '../../api/user/user.mutation';
import LoginForm from '../../components/Form/LoginForm';
import EmailVerificationForm from '../../components/Form/EmailVerificationForm';
import EmailPasswordResetForm from '../../components/Form/EmailPasswordResetForm';

// ICONS
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
    const [ userLogin, { loading: mutationLoading }] = useMutation(LOGIN_MUTATION);
    const { toggle: authenticateUser } = useContext(AuthenticatedContext);
    const { userLoggedIn } = useContext(UserContext);
    const [error, setError] = useState({});
    const [resetPassword, setResetPassword] = useState(false);

    const handleSubmit = (e, inputs) => {
        e.preventDefault();

        userLogin({ variables: { input: inputs } })
            .then(({ data }) => {
                console.log(data);
                userLoggedIn(data.userLogin);
                authenticateUser(true);
                localStorage.setItem('ptToken', data.userLogin.token)
            })
            .catch((err) => {
                const error = err.graphQLErrors[0];

                if(error.name === 'email_not_verified') {
                    setError({
                        ...error,
                        email: inputs.email,
                    });
                } else {
                    setError({
                        email: error,
                        password: error,
                    })
                }
            })
    };

    if (mutationLoading) return <div>Loading</div>;

    return (
        <Container>
            <Row className="mt-5">
                {
                    !resetPassword && (
                        <Col>
                            {
                                error.name === 'email_not_verified'
                                    ? (
                                        <EmailVerificationForm
                                            defaultEmail={error.email}
                                        />
                                    )
                                    : (
                                        <Fragment>
                                            <h3>Login</h3>
                                            <LoginForm error={error} handleSubmit={handleSubmit} />
                                            <a
                                                id="forgotPasswordButton"
                                                href="javascript:void(0);"
                                                onClick={() => setResetPassword(true)}
                                            >
                                                Forgot password?
                                            </a>
                                        </Fragment>
                                    )
                            }
                        </Col>
                    )
                }
                {
                    resetPassword && (

                        <Col>
                            <EmailPasswordResetForm />
                            <Row className="mt-3">
                                <a
                                    id="backToLoginButton"
                                    href="javascript:void(0);"
                                    onClick={() => setResetPassword(false)}
                                >
                                    <FontAwesomeIcon icon={faCaretLeft} /> back
                                </a>
                            </Row>
                        </Col>
                    )
                }
            </Row>
        </Container>
    )
};

export default Login;
