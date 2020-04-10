import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Container, Row } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';

// CONTEXT
import { AuthenticatedContext } from '../../context/AuthenticatedContext';

// MUTATION
import { LOGIN_MUTATION } from '../../api/user/user.mutation';

// COMPONENTS
import LoginForm from '../../components/Form/LoginForm';
import EmailPasswordResetForm from '../../components/Form/EmailPasswordResetForm';

// UTILS
import { getLoginStatus } from "../../components/Form/form-utils";
import { useLocalStorage } from "../../hooks/hooks";
import { TOKEN_KEY } from "../../const/localStorage";

const Login = () => {
    const [ userLogin, { loading: mutationLoading }] = useMutation(LOGIN_MUTATION);
    const { toggle: authenticateUser } = useContext(AuthenticatedContext);
    const { userLoggedIn } = useContext(UserContext);
    const [error, setError] = useState({});
    const [resetPassword, setResetPassword] = useState(false);
    const [setLocalStorage] = useLocalStorage(TOKEN_KEY);

    const handleSubmit = (e, inputs) => {
        e.preventDefault();

        userLogin({ variables: { input: inputs } })
            .then(({ data }) => {
                console.log(data);
                userLoggedIn(data.userLogin);
                authenticateUser(true);
                setLocalStorage(data.userLogin.token);
            })
            .catch((err) => {
                // TODO: rename to not be the same as the state error name
                const error = err.graphQLErrors[0];

                if(error.name === 'email_not_verified') {
                    setError({
                        ...error,
                        emailNotVerified: true,
                    });
                } else {
                    setError({
                        email: error,
                        password: error,
                    })
                }
            })
    };

    return (
        <Container>
            <Row className="mt-5">
                {{
                    loading: (<div>Loading</div>),
                    form: (
                        <LoginForm
                            error={error}
                            handleSubmit={handleSubmit}
                            resetPassword={() => setResetPassword(true)}
                        />
                    ),
                    reset: (
                        <EmailPasswordResetForm
                            resetPassword={() => setResetPassword(false)}
                        />
                    ),
                }[getLoginStatus(mutationLoading, resetPassword)]}
            </Row>
        </Container>
    )
};

export default Login;
