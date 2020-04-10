

describe('@Reset Password', () => {


    describe('Success', () => {
        beforeEach(() => {
            cy.visit('/reset/')
        });

        it('should redirect user to home page', () => {
            const props = {email: 'test@test.com', password: '1234qwer'};
            cy
                .login(props)
                .location().should((loc) => {
                expect(loc.pathname).to.eq('/')
            })
        });
    });

    describe('Error', () => {
        beforeEach(() => {
            cy.visit('/reset/12345')
        });

        it('should render "EmailPasswordResetForm if token is expired', () => {
            cy
                .get('#EmailPasswordResetForm')
                .should('be.visible')
        });
    });
})