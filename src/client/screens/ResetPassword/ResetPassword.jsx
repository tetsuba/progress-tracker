import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";

// QUERIES
import { CONFIRM_TOKEN_QUERY } from "../../api/token/token.query";

// MUTATIONS
import { REST_PASSWORD_MUTATION } from "../../api/user/user.mutation";

// COMPONENTS
import Loading from "../../components/Loading/Loading";
import EmailPasswordResetForm from "../../components/Form/EmailPasswordResetForm";
import ResetPasswordForm from "../../components/Form/ResetPasswordForm";

// UTILS
import { getRestPasswordStatus } from "../../components/Form/form-utils";


const ResetPassword = () => {
    let { token } = useParams();
    token = decodeURIComponent(token);
    const variables = { token };
    const confirmation = useQuery(CONFIRM_TOKEN_QUERY, {variables});
    const [resetPassword, resetPasswordOptions] = useMutation(REST_PASSWORD_MUTATION);

    return (
        <Container>
            {{
                loading: <Loading />,
                form: (
                    <ResetPasswordForm
                        resetPassword={resetPassword}
                        token={token}
                    />
                ),
                success: (
                    <Row>
                        <h3>
                            Password updated. Please <Link to="/login">click here</Link> to login
                        </h3>
                    </Row>
                ),
                error: ( /* token expired */
                    <>
                        <Row className="mt-5">
                            <p>Your last request to reset password has expired. Please send another request to reset your password.</p>
                        </Row>
                        <Row className="mt-5">
                            <Col>
                                <EmailPasswordResetForm />
                            </Col>

                        </Row>
                    </>
                ),
            }[getRestPasswordStatus(confirmation, resetPasswordOptions)]}
        </Container>
    )
};

export default ResetPassword;
