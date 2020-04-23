import React from 'react'
import { act } from 'react-dom/test-utils'
import {
  delay,
  graphRenderer,
  updateTextInput,
} from '../../../../test/testHelper'

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children,
}))

// COMPONENTS
import Login from '../Login'
import ForgotMyPasswordForm from '../../../components/Form/ForgotMyPasswordForm'
import EmailVerificationForm from '../../../components/Form/EmailVerificationForm'

// MOCK DATA
import {
  loginMockDataErrorEmailNotVerified,
  loginMockDataSuccess,
  verifyUserEmailMutationSuccess,
  passwordResetMockDataSuccess,
} from '../../../../test/mockApi/user/userMockMutation'

describe('<Login>', () => {
  describe('Initial render', () => {
    it('should render "login"', async () => {
      let wrapper
      act(() => {
        wrapper = graphRenderer(Login, [], {})
      })
      expect(wrapper.find(Login)).toMatchSnapshot()
    })
    describe('A user logs-in with a valid email and password', () => {
      it('should save a token in localStorage', async () => {
        let wrapper
        await act(async () => {
          wrapper = graphRenderer(Login, [loginMockDataSuccess], {})
          await delay()
        })

        expect(window.localStorage.getItem('ptToken')).toBeNull()
        wrapper.update()

        act(() => {
          updateTextInput(wrapper, 'email', 'test@test.com')
        })

        wrapper.update()

        act(() => {
          updateTextInput(wrapper, 'password', '1234')
        })

        wrapper.update()

        await act(async () => {
          await wrapper.find('#LoginForm').get(0).props.onSubmit({
            preventDefault: jest.fn(),
          })
        })

        wrapper.update()
        expect(window.localStorage.getItem('ptToken')).toEqual('token')
      })
    })

    describe('A user logs-in with an email address that is not verified', () => {
      /* NOTE:
       * After completing the registration form a user is sent a
       * confirmation email to verify the users email address.
       * If the user tries to login without confirming their email
       * address. The user will be directed to this component to send
       * another confirmation.
       * */

      let wrapper
      beforeEach(async () => {
        await act(async () => {
          wrapper = graphRenderer(
            Login,
            [
              loginMockDataErrorEmailNotVerified,
              verifyUserEmailMutationSuccess,
            ],
            {}
          )
          await delay()
        })

        wrapper.update()

        act(() => {
          updateTextInput(wrapper, 'email', 'test@test.com')
        })

        wrapper.update()

        act(() => {
          updateTextInput(wrapper, 'password', '1234')
        })

        wrapper.update()

        await act(async () => {
          await wrapper.find('#LoginForm').get(0).props.onSubmit({
            preventDefault: jest.fn(),
          })
        })

        wrapper.update()
      })

      it('should render "emailNotVerified" form', async () => {
        expect(wrapper.find(EmailVerificationForm)).toMatchSnapshot()
      })
      describe('A user submits a valid email address', () => {
        it('should render "success" message', async () => {
          act(() => {
            updateTextInput(wrapper, 'email', 'test@test.com')
          })

          wrapper.update()

          await act(async () => {
            wrapper.find('#EmailVerificationForm').get(0).props.onSubmit({
              preventDefault: jest.fn(),
            })
            await delay()
          })
          wrapper.update()
          expect(wrapper.find(Login)).toMatchSnapshot()
        })
      })
    })

    describe('A user clicks on "forgot password" link', () => {
      let wrapper
      beforeEach(async () => {
        act(() => {
          wrapper = graphRenderer(
            Login,
            [loginMockDataSuccess, passwordResetMockDataSuccess],
            {}
          )
        })
        wrapper.find('#TextLink').simulate('click')
        wrapper.update()
      })

      it('should render "forgotMyPassword" form', async () => {
        expect(wrapper.find(ForgotMyPasswordForm)).toMatchSnapshot()
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
          expect(wrapper.find(Login)).toMatchSnapshot()
        })
      })
    })
  })
})
