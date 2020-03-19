/*
 * https://react-bootstrap.github.io/components/progress/
 *  */

import React from 'react';
import zxcvbn from 'zxcvbn';
import {ProgressBar} from "react-bootstrap";

const PasswordStrength = ({password}) => {
    const passwordResult = zxcvbn(password);

    const result = [
        {
            variant: 'danger',
            now: password.length > 4 ? 20: 0,
            label: password.length > 4 ? 'Bad': '',
        },
        {
            variant: 'warning',
            now: 40,
            label: 'Weak'
        },
        {
            variant: 'info',
            now: 60,
            label: 'Good'
        },
        {
            variant: 'info',
            now: 100,
            label: 'Strong'
        },
    ];

    return (
        <div>
            <ProgressBar { ...result[passwordResult.score] } />
            <small id="passwordHelpBlock" className="form-text text-muted">
                {
                    passwordResult.feedback.warning &&
                        `Tip: ${passwordResult.feedback.warning}`
                }
            </small>
        </div>
    )
};

export default PasswordStrength;