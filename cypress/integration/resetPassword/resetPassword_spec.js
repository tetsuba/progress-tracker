

describe('@ResetPassword', () => {

    describe('Success', () => {

    })

    describe('Success', () => {

    })

    describe('Password strength', () => {
        beforeEach(() => {
            cy.visit('/reset/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        });

        it('should display the password strength is "Bad"', () => {
            const password = '123456';
            const strength = 'Bad';
            cy
                .passwordStrength(password, strength);
        });

        it('should display the password strength is "Weak"', () => {
            const password = 'tiger12';
            const strength = 'Weak';
            cy
                .passwordStrength(password, strength);
        });

        it('should display the password strength is "Good"', () => {
            const password = 't1gr12!';
            const strength = 'Good';
            cy
                .passwordStrength(password, strength);
        });

        it('should display the password strength is "Strong"', () => {
            const password = 'G@@dPassw0d';
            const strength = 'Strong';
            cy
                .passwordStrength(password, strength);
        });
    });

    describe('Reset password token is expired', () => {
        beforeEach(() => {
            cy.visit('/reset/12345expired')
        });

        it('should render a warning message and to send another request to reset password', () => {
            cy
                .get('#EmailPasswordResetForm')
                .should('be.visible')
        });
    });
})