import { testRenderer } from '../../../../test/testHelper'
import RegisterForm from '../RegisterForm'

describe('<RegisterForm>', () => {
  const baseProps = {
    handleSubmit: jest.fn(),
  }

  describe('@Render', () => {
    it('should render', () => {
      const props = {
        ...baseProps,
      }
      const wrapper = testRenderer(RegisterForm, props)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('@Events', () => {
    describe('onChange', () => {
      it('should update firstName input', () => {
        const wrapper = testRenderer(RegisterForm, baseProps)
        const email = { name: 'firstName' }
        const expected = 'firstName'

        wrapper.find(email).simulate('change', {
          persist: jest.fn(),
          target: {
            name: 'firstName',
            value: 'firstName',
          },
        })

        expect(wrapper.find(email).prop('value')).toEqual(expected)
      })

      it('should update laseName input', () => {
        const wrapper = testRenderer(RegisterForm, baseProps)
        const email = { name: 'lastName' }
        const expected = 'lastName'

        wrapper.find(email).simulate('change', {
          persist: jest.fn(),
          target: {
            name: 'lastName',
            value: 'lastName',
          },
        })

        expect(wrapper.find(email).prop('value')).toEqual(expected)
      })

      it('should update email input', () => {
        const wrapper = testRenderer(RegisterForm, baseProps)
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
    })

    describe('onSubmit', () => {
      it('should trigger handleSubmit', () => {
        const wrapper = testRenderer(RegisterForm, baseProps)
        const id = '#RegisterForm'
        wrapper.find(id).props().onSubmit({ preventDefault: jest.fn() })
        expect(baseProps.handleSubmit).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('@Error', () => {
    it('should display an error message if error is provided', () => {
      const props = {
        ...baseProps,
        error: {
          graphQLErrors: [
            {
              message: 'This an email error',
            },
          ],
        },
      }
      const wrapper = testRenderer(RegisterForm, props)

      wrapper.find({ type: 'invalid' }).forEach((message, i) => {
        expect(message.prop('children')).toEqual('This an email error')
      })
    })
  })
})
