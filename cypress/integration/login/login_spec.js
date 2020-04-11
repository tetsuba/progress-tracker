
describe('@Login', () => {

    beforeEach(() => {
        cy.visit('/login')
    });

    describe('Success', () => {
        it('should redirect user to home page', () => {
            const props = {email: 'test@test.com', password: '1234qwer'};
            cy
                .login(props)
                .location().should((loc) => {
                    expect(loc.pathname).to.eq('/')
                })
        });
    });

    describe('Errors', () => {

        it('should return an error if incorrect email is entered', () => {
            const props = {email: 'test@test2.com', password: '1234567890'};
            cy
                .login(props)
                .loginInputsInValid()
                .get('.invalid-feedback')
                .contains('You have entered incorrect username or password')
        });

        it('should return an error if incorrect password is entered', () => {
            const props = {email: 'test@test.com', password: '1234567890'};
            cy
                .login(props)
                .loginInputsInValid()
                .get('.invalid-feedback')
                .contains('You have entered incorrect username or password')
        });

        it('should do nothing if an incorrect email format entered', () => {
            const props = {email: 'testtestcom', password: '1234567890'};
            cy
                .login(props)
                .loginInputsNotInValid()
                .get('.invalid-feedback')
                .should('be.empty')
        })
    });

    describe('Forgot password', () => {
        it('should display an error if an email does not exist', () => {
            cy
                .goToResetPassword()
                .resetPassword('wrong@email.com')
                .get('.invalid-feedback')
                .contains('Email address does not exist')
        })


        it('should display reset password and go back to login', () => {
            cy
                .goToResetPassword()
                .get('#EmailPasswordResetForm')
                .should('be.visible')
                .backToLogin()
                .get('#loginForm')
                .should('be.visible')
        })
    })
});