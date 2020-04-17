import { testRenderer, testRendererFull } from '../../../../test/testHelper'

// COMPONENTS
import ForgotMyPasswordForm from '../ForgotMyPasswordForm'
import EmailVerificationForm from '../EmailVerificationForm'

describe('<ForgotMyPasswordForm>', () => {
  const props = {
    defaultEmail: 'test@test.com',
    handleSubmit: jest.fn(),
  }

  describe('@Render', () => {
    it('should render', () => {
      const wrapper = testRenderer(ForgotMyPasswordForm, props)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render back button', () => {
      const wrapper = testRenderer(ForgotMyPasswordForm, {
        ...props,
        showLoginForm: jest.fn(),
      })
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('@Events', () => {
    describe('onSubmit', () => {
      it('should trigger handleSubmit', () => {
        const wrapper = testRenderer(ForgotMyPasswordForm, props)
        wrapper
          .find('#ForgotMyPasswordForm')
          .props()
          .onSubmit({ preventDefault: jest.fn() })

        expect(props.handleSubmit).toHaveBeenCalledTimes(1)
      })
    })

    describe('onChange', () => {
      it('should update email input', () => {
        const wrapper = testRenderer(EmailVerificationForm, props)
        const email = { name: 'email' }
        const expected = 'test@test.com'

        wrapper.find(email).simulate('change', {
          persist: jest.fn(),
          target: {
            name: 'email',
            value: expected,
          },
        })
        expect(wrapper.find(email).prop('value')).toEqual(expected)
      })
    })

    describe('onClick', () => {
      it('should trigger showLoginForm', () => {
        const showLoginFormMock = jest.fn()
        const wrapper = testRendererFull(ForgotMyPasswordForm, {
          ...props,
          showLoginForm: showLoginFormMock,
        })
        wrapper.find('#TextLink').simulate('click')
        expect(showLoginFormMock).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('@Error', () => {
    it('should display an error if error is provided', () => {
      const errorMessage = 'This is an error message'
      const error = {
        graphQLErrors: [
          {
            message: errorMessage,
          },
        ],
      }
      const wrapper = testRenderer(EmailVerificationForm, {
        ...props,
        error: error,
      })
      expect(wrapper.find({ type: 'invalid' }).prop('children')).toEqual(
        errorMessage
      )
    })
  })
})
