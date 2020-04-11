import { GraphQLError } from "graphql";
import { act } from 'react-dom/test-utils';
import { graphRenderer, delay } from "../../../../test/testHelper";

// COMPONENTS
import ForgotMyPasswordForm from "../ForgotMyPasswordForm";

// MUTATIONS
import { SEND_PASSWORD_RESET_CONFIRMATION_MUTATION}  from "../../../api/user/user.mutation";

describe('<ForgotMyPasswordForm>', () => {

    const request = {
        query: SEND_PASSWORD_RESET_CONFIRMATION_MUTATION,
        variables: { input: { email: 'test@test.com'} },
    };

    const id = '#ForgotMyPasswordForm';
    const props = {
        defaultEmail: 'test@test.com',
        resetPassword: jest.fn(),
    };

    describe('@Render', () => {
        const result = {
            data: { sendPasswordResetConfirmation: { confirmation: 'Confirm'} }
        };

        it('should render email password reset form', () => {
            const mocks = [{ request, result }];
            const wrapper = graphRenderer(ForgotMyPasswordForm, mocks, props);
            expect(wrapper.find(ForgotMyPasswordForm)).toMatchSnapshot();
        });

        it('should render a success message', async() => {
            const mocks = [{ request, result }];
            const wrapper = graphRenderer(ForgotMyPasswordForm, mocks, props);

            act(() => {
                wrapper.find(id).get(0).props.onSubmit({
                    preventDefault: jest.fn(),
                });
            });

            await delay();
            wrapper.update();
            expect(wrapper.find(ForgotMyPasswordForm)).toMatchSnapshot();
        });
    });

    describe('@Error', () => {
        const errorMessage = 'error occurred';
        const errors = [new GraphQLError(errorMessage)];

        it('should render an error message if form returns an error', async() => {
            const mocks = [{ request, result: {errors}}];
            const wrapper = graphRenderer(ForgotMyPasswordForm, mocks, props);

            act(() => {
                wrapper.find(id).get(0).props.onSubmit({
                    preventDefault: jest.fn(),
                });
            });

            await delay();
            wrapper.update();
            wrapper.find({type: 'invalid'}).forEach((message) => {
                expect(message.prop('children')).toEqual(errorMessage)
            })
        })
    })
});