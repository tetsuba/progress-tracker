import { GraphQLError } from "graphql";
import { act } from 'react-dom/test-utils';
import { graphRenderer, delay } from "../../../../test/testHelper";

// COMPONENTS
import EmailVerificationForm from "../EmailVerificationForm";

// MUTATIONS
import { VERIFY_EMAIL_MUTATION}  from "../../../api/user/user.mutation";

describe('<EmailVerificationForm>', () => {

    const request = {
        query: VERIFY_EMAIL_MUTATION,
        variables: { input: { email: 'test@test.com'} },
    };

    const id = '#EmailVerificationForm';
    const props = { defaultEmail: 'test@test.com' };

    describe('@Render', () => {
        const result = {
            data: { verifyEmail: { confirmation: 'Confirm'} }
        };

        it('should render email verification form', () => {
            const mocks = [{ request, result }];
            const wrapper = graphRenderer(EmailVerificationForm, mocks, props);
            expect(wrapper.find(EmailVerificationForm)).toMatchSnapshot();
        });

        it('should render success message', async() => {
            const mocks = [{ request, result }];
            const wrapper = graphRenderer(EmailVerificationForm, mocks, props);

            act(() => {
                wrapper.find(id).get(0).props.onSubmit({
                    preventDefault: jest.fn(),
                });
            });

            await delay();
            wrapper.update();
            expect(wrapper.find(EmailVerificationForm)).toMatchSnapshot();
        });
    });

    describe('@Error', () => {
        const errorMessage = 'error occurred';
        const errors = [new GraphQLError(errorMessage)];

        it('should render an error message if form returns an error', async() => {
            const mocks = [{ request, result: {errors}}];
            const wrapper = graphRenderer(EmailVerificationForm, mocks, props);

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