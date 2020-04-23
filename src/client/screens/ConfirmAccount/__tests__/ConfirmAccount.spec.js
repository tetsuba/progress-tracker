import { act } from 'react-dom/test-utils'
import {
  delay,
  graphRenderer,
  updateTextInput,
} from '../../../../test/testHelper'
import ConfirmAccount from '../ConfirmAccount'
import EmailVerificationForm from '../../../components/Form/EmailVerificationForm'
import {
  confirmTokenQueryError,
  confirmTokenQuerySuccess,
} from '../../../../test/mockApi/token/tokenMockQuery'
import { verifyUserEmailMutationSuccess } from '../../../../test/mockApi/user/userMockMutation'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ token: 'confirmToken1234' }),
  Link: ({ children }) => children,
}))

describe('<ConfirmAccount>', () => {
  describe('Initial render', () => {
    // TODO: account verified should be email verified
    describe('Account verified token not expired', () => {
      it('should render account verified message', async () => {
        let wrapper

        await act(async () => {
          wrapper = graphRenderer(
            ConfirmAccount,
            [confirmTokenQuerySuccess],
            {}
          )
          await delay()
        })

        wrapper.update()
        expect(wrapper.find(ConfirmAccount)).toMatchSnapshot()
      })
    })

    describe('Account verified token expired', () => {
      let wrapper
      beforeEach(async () => {
        await act(async () => {
          wrapper = graphRenderer(
            ConfirmAccount,
            [confirmTokenQueryError, verifyUserEmailMutationSuccess],
            {}
          )
          await delay()
        })
        wrapper.update()
      })

      it('should render email verification form', async () => {
        expect(wrapper.find(EmailVerificationForm)).toMatchSnapshot()
      })

      describe('A user submits a valid email address', () => {
        it('should render "success"', async () => {
          act(() => {
            updateTextInput(wrapper, 'email', 'test@test.com')
          })

          wrapper.update()

          await act(async () => {
            await wrapper.find('#EmailVerificationForm').get(0).props.onSubmit({
              preventDefault: jest.fn(),
            })
            await delay()
          })

          wrapper.update()
          expect(wrapper.find(ConfirmAccount)).toMatchSnapshot()
        })
      })
    })
  })
})
