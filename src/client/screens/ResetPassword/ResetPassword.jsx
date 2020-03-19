import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {RESET_PASSWORD_CONFIRMATION_QUERY} from "../../api/token/token.query";

import Loading from "../../components/Loading/Loading";
import EmailPasswordResetForm from "../../components/Form/EmailPasswordResetForm";
import ResetPasswordForm from "../../components/Form/ResetPasswordForm";

const ResetPassword = () => {
    let { token } = useParams();
    token = decodeURIComponent(token);
    const variables = { token };
    const { data, loading, error } = useQuery(RESET_PASSWORD_CONFIRMATION_QUERY, {variables});

    if (loading) return <Loading />;

    return (
        <Container>
            { data && (
                <>
                    <Row className="mt-5">
                        <h1>Reset Password</h1>
                    </Row>
                    <ResetPasswordForm userId={ data.confirmPasswordReset.userId } />
                </>
            )}
            { error && (
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
            )}
        </Container>
    )
};

export default ResetPassword;
