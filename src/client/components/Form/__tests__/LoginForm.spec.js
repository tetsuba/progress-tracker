import { testRenderer } from "../../../../test/testHelper";

// COMPONENTS
import LoginForm from "../LoginForm";


describe('<FormLogin>', () => {
    const baseProps = {
        handleSubmit: jest.fn(),
        resetPassword: jest.fn(),
    };

    describe('@Render', () => {
        it('should render the login form', () => {
            const props = {
                ...baseProps,
                error: {},
            };

            const wrapper = testRenderer(LoginForm, props);
            expect(wrapper).toMatchSnapshot()
        });

        it('should render the email verification form', () => {
            const props = {
                ...baseProps,
                error: { emailNotVerified: true },
            };

            const wrapper = testRenderer(LoginForm, props);
            expect(wrapper).toMatchSnapshot()
        });
    });

    describe('@Events', () => {
        const props = {
            ...baseProps,
            error: {},
        };

        it('should update email input with event onChange', () => {
            const wrapper = testRenderer(LoginForm, props);
            const email = { name: 'email' };
            const expected = 'test@test.com';

            wrapper.find(email).simulate('change', {
                persist: jest.fn(),
                target: {
                    name: 'email',
                    value: 'test@test.com',
                }
            });

            expect(wrapper.find(email).prop('value')).toEqual(expected)
        });

        it('should update password input with event onChange', () => {
            const wrapper = testRenderer(LoginForm, props);
            const password = { name: 'password' };
            const expected = '12345678';

            wrapper.find(password).simulate('change', {
                persist: jest.fn(),
                target: {
                    name: 'password',
                    value: '12345678',
                }
            });

            expect(wrapper.find(password).prop('value')).toEqual(expected)
        });

        it('should submit form with event onSubmit', () => {
            const wrapper = testRenderer(LoginForm, props);
            const id = '#loginForm';
            wrapper.find(id).simulate('submit');
            expect(props.handleSubmit).toHaveBeenCalledTimes(1)
        })
    });

    describe('@Error', () => {
        it('should render an error message if the error is an email or password error', () => {
            const props = {
                ...baseProps,
                error: {
                    email: {
                        message: 'This an email error',
                    },
                    password: {
                        message: 'This is a password error',
                    },
                },
            };
            const expected = Object.values(props.error)

            const wrapper = testRenderer(LoginForm, props);

            wrapper.find({type: 'invalid'}).forEach((message, i) => {
                expect(message.prop('children'))
                    .toEqual(expected[i].message)
            })
        });
    })
});
