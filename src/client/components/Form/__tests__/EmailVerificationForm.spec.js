import { testRenderer } from '../../../../test/testHelper'

// COMPONENTS
import EmailVerificationForm from '../EmailVerificationForm'

describe('<EmailVerificationForm>', () => {
  const props = {
    handleSubmit: jest.fn(),
    error: undefined,
  }

  it('should render ', () => {
    const wrapper = testRenderer(EmailVerificationForm, props)
    expect(wrapper).toMatchSnapshot()
  })

  describe('@Events', () => {
    describe('onSubmit', () => {
      it('should trigger handleSubmit', () => {
        const wrapper = testRenderer(EmailVerificationForm, props)

        wrapper.find('#EmailVerificationForm')
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
            value: 'test@test.com',
          },
        })
        expect(wrapper.find(email).prop('value')).toEqual(expected)
      })
    })
  })

  describe('@Error', () => {
    it('should display an error if error is provided', () => {
      const errorMessage = 'This is an error message'
      const error = {
        graphQLErrors: [
          {
            message: errorMessage
          }
        ]
      }
      const wrapper = testRenderer(EmailVerificationForm, {
        ...props,
        error: error,
      })
      expect(wrapper.find({type: 'invalid'}).prop('children')).toEqual(errorMessage)
    })
  })
})
