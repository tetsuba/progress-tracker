import { GraphQLError } from "graphql";
import { act } from 'react-dom/test-utils';
import { graphRenderer, delay } from "../../../../test/testHelper";

// COMPONENTS
import ResetPassword from "../ResetPassword";

// MUTATIONS
import { REST_PASSWORD_MUTATION }  from "../../../api/user/user.mutation";

// QUERIES
import { CONFIRM_TOKEN_QUERY } from "../../../api/token/token.query";

jest.mock('react-router-dom', () => ({
    useParams: jest.fn().mockReturnValue({ token: 'token1234' }),
    Link: 'Link',
}));

describe('<ResetPasswordForm>', () => {

    function updateInput(wrapper, name, value) {
        wrapper.find({name}).get(0).props.onChange({
            persist: jest.fn(),
            target: { name, value }
        });
    }

    describe('@Render', () => {
        const requestQuery = {
            query: CONFIRM_TOKEN_QUERY,
            variables: { token: 'token1234' },
        };

        const resultQuery = {
            data: { confirmToken: { success: 'Token confirmed.'} },
        };

        it('should render "loading"', async () => {
            let wrapper;
            const mocks = [
                { request: requestQuery, result: resultQuery },
            ];

            act(() => {
                wrapper = graphRenderer(ResetPassword, mocks, {});
            });

            expect(wrapper.find(ResetPassword)).toMatchSnapshot();
        });

        it('should render "form"', async () => {
            let wrapper;
            const mocks = [
                { request: requestQuery, result: resultQuery },
            ];

            // act(() => {
            wrapper = graphRenderer(ResetPassword, mocks, {});
            // });

            await delay();
            wrapper.update();
            expect(wrapper.find(ResetPassword)).toMatchSnapshot();
        });

        it('should render "success"', async () => {
            let wrapper;
            const resetPasswordMock = {
                request: {
                    query: REST_PASSWORD_MUTATION,
                    variables: {
                        input: {
                            token: 'token1234',
                            password: '1234',
                        }
                    },
                },
                result: {
                    data: {
                        resetPassword: {
                            confirmation: 'New password is saved',
                        }
                    },
                }
            };

            const mocks = [
                { request: requestQuery, result: resultQuery },
                resetPasswordMock,
            ];

            act(() => {
                wrapper = graphRenderer(ResetPassword, mocks, {});
            });

            await delay();

            act(() => {
                wrapper.update();
                updateInput(wrapper, 'newPassword', '1234');
            });

            await delay();

            act(() => {
                wrapper.update();
                updateInput(wrapper, 'confirmPassword', '1234');
            });


            act(() => {
                wrapper.update();
                wrapper
                    .find('#ResetPasswordForm')
                    .get(0).props
                    .onSubmit({
                        preventDefault: jest.fn(),
                    })
            });

            await delay();

            act(() => {
                wrapper.update();
                expect(wrapper.find(ResetPassword)).toMatchSnapshot();
            })
        });

        it('should render "error"', async () => {
            let wrapper;
            const errorMessage = 'error occurred';
            const errors = [new GraphQLError(errorMessage)];
            const mocks = [
                {
                    request: requestQuery,
                    result: {errors},
                },
            ];

            act(() => {
                wrapper = graphRenderer(ResetPassword, mocks, {});
            });

            await delay();
            wrapper.update();
            expect(wrapper.find(ResetPassword)).toMatchSnapshot();
        });
    });
});

