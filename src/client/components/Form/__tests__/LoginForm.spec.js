import { testRenderer, testRendererFull } from '../../../../test/testHelper'

// COMPONENTS
import LoginForm from '../LoginForm'

describe('<FormLogin>', () => {
  const baseProps = {
    handleSubmit: jest.fn(),
  }

  describe('@Render', () => {
    it('should render', () => {
      const props = {
        ...baseProps,
      }

      const wrapper = testRenderer(LoginForm, props)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('@Events', () => {
    describe('onChange', () => {
      it('should update email input', () => {
        const wrapper = testRenderer(LoginForm, baseProps)
        const email = { name: 'email' }
        const expected = 'test@test.com'

        wrapper.find(email).simulate('change', {
          persist: jest.fn(),
          target: {
            name: 'email',
            value: 'test@test.com',
          },
        })

        expect(wrapper.find(email).prop('value')).toEqual(expected)
      })

      it('should update password input', () => {
        const wrapper = testRenderer(LoginForm, baseProps)
        const password = { name: 'password' }
        const expected = '12345678'

        wrapper.find(password).simulate('change', {
          persist: jest.fn(),
          target: {
            name: 'password',
            value: '12345678',
          },
        })
        expect(wrapper.find(password).prop('value')).toEqual(expected)
      })
    })

    describe('onSubmit', () => {
      it('should trigger handleSubmit', () => {
        const wrapper = testRenderer(LoginForm, baseProps)
        const id = '#LoginForm'
        wrapper.find(id).props().onSubmit({ preventDefault: jest.fn() })
        expect(baseProps.handleSubmit).toHaveBeenCalledTimes(1)
      })
    })

    describe('onClick', () => {
      it('should trigger hideLoginForm', () => {
        const hideLoginFormMock = jest.fn()
        const wrapper = testRendererFull(LoginForm, {
          ...baseProps,
          hideLoginForm: hideLoginFormMock,
        })
        wrapper.find('#TextLink').simulate('click')
        expect(hideLoginFormMock).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('@Error', () => {
    it('should display an error if error is provided', () => {
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
      }
      const expected = Object.values(props.error)
      const wrapper = testRenderer(LoginForm, props)

      wrapper.find({ type: 'invalid' }).forEach((message, i) => {
        expect(message.prop('children')).toEqual(expected[i].message)
      })
    })
  })
})
