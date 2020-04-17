import { act } from 'react-dom/test-utils'
import { graphRenderer, delay, updateTextInput } from '../../../../test/testHelper'

// COMPONENTS
import ResetPassword from '../ResetPassword'

import {
  confirmTokenQueryError,
  confirmTokenQuerySuccess,
  passwordResetMockDataSuccess,
  resetPasswordSuccess,
} from './mockData';
import Login from '../../Login/Login';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ token: 'token1234' }),
  Link: ({ children }) => children,
}))

describe('<ResetPassword>', () => {
  describe('Initial render', () => {
    describe('Reset password token not expired', () => {
      it('should render reset password form', async () => {
        let wrapper

        await act(async () => {
          wrapper = graphRenderer(ResetPassword, [confirmTokenQuerySuccess], {})
          await delay()
        })

        wrapper.update()
        expect(wrapper.find(ResetPassword)).toMatchSnapshot()
      })
      describe('A user submits a new password', () => {
        it('should render "success"', async () => {
          let wrapper
          await act(async () => {
            wrapper = graphRenderer(ResetPassword, [confirmTokenQuerySuccess, resetPasswordSuccess], {})
            await delay()
          })

          wrapper.update()

          act(() => {
            updateTextInput(wrapper, 'newPassword', '1234')
          })

          wrapper.update()

          act(() => {
            updateTextInput(wrapper, 'confirmPassword', '1234')
          })

          wrapper.update()

          await act(async () => {
            await wrapper.find('#ResetPasswordForm').get(0).props.onSubmit({
              preventDefault: jest.fn(),
            })
          })

          wrapper.update()
          expect(wrapper.find(ResetPassword)).toMatchSnapshot()
        })
      })
    })

    describe('Reset password token expired', () => {
      let wrapper
      beforeEach(async () => {
        await act(async () => {
          wrapper = graphRenderer(ResetPassword, [confirmTokenQueryError, passwordResetMockDataSuccess], {})
          await delay()
        })

        wrapper.update()
      })

      it('should render forgot my password form', async () => {
        expect(wrapper.find(ResetPassword)).toMatchSnapshot()
      })

      describe('A user submits a valid email address', () => {
        it('should render "success"', async () => {
          act(() => {
            updateTextInput(wrapper, 'email', 'test@test.com')
          })

          wrapper.update()

          await act(async () => {
            await wrapper.find('#ForgotMyPasswordForm').get(0).props.onSubmit({
              preventDefault: jest.fn(),
            })
            await delay()
          })

          wrapper.update()
          expect(wrapper.find(ResetPassword)).toMatchSnapshot()
        })
      })
    })
  })
})
