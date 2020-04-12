
describe('Reset my password', () => {
    beforeEach(() => {
        cy.visit('/reset/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    });

    it('should submit a password with password strength "Bad"', () => {
        const newPassword = '123456';
        const confirmPassword = '123456' ;
        const strength = 'Bad';
        cy
            .submitPassword(newPassword, confirmPassword, strength)
    });

    it('should submit a password with password strength "Weak"', () => {
        const newPassword = 'tiger12';
        const confirmPassword = 'tiger12' ;
        const strength = 'Weak';
        cy
            .submitPassword(newPassword, confirmPassword, strength)
    });

    it('should submit a password with password strength "Good"', () => {
        const newPassword = 't1gr12!';
        const confirmPassword = 't1gr12!' ;
        const strength = 'Good';
        cy
            .submitPassword(newPassword, confirmPassword, strength)
    });

    it('should submit a password with password strength "Strong"', () => {
        const newPassword = 'G@@dPassw0d';
        const confirmPassword = 'G@@dPassw0d' ;
        const strength = 'Strong';
        cy
            .submitPassword(newPassword, confirmPassword, strength)
    });

    it('should [ NOT ] submit a password if passwords do not match', () => {
        const newPassword = 'password123';
        const confirmPassword = 'password122' ;
        const strength = 'Bad';
        cy
            .fillResetPasswordForm(newPassword, confirmPassword, strength)
            .passwordMatchError()
            .submitButtonDisabled('#ResetPasswordSubmit')
    })



    describe('Token has expired (12hrs)', () => {
        beforeEach(() => {
            cy.visit('/reset/12345expired')
        });

        it('should render forgot my password form', () => {
            cy
                .get('#ForgotMyPasswordForm')
                .should('be.visible')
        });

        describe('Forgot my password form', () => {
            it('should display an error if an incorrect email address submitted', () => {
                cy
                    .forgotMyPasswordSubmit('wrong@email.com')
                    .get('.invalid-feedback')
                    .contains('Email address does not exist')
            })

            it('should display confirmation message with a valid email address submitted', () => {
                cy
                    .forgotMyPasswordSubmit('test@test.com')
            })
        })
    });
})