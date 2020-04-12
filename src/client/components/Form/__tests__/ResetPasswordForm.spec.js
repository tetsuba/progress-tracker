import { testRenderer } from '../../../../test/testHelper'

// COMPONENTS
import ResetPasswordForm from '../ResetPasswordForm'

describe('<ResetPasswordForm>', () => {
  const props = {
    userId: '1234567890',
    resetPassword: jest.fn(),
  }

  function updateInput(wrapper, name, value) {
    wrapper.find({ name }).get(0).props.onChange({
      persist: jest.fn(),
      target: { name, value },
    })
  }

  describe('@Render', () => {
    it('should render reset password form', () => {
      const wrapper = testRenderer(ResetPasswordForm, props)
      expect(wrapper).toMatchSnapshot()
    })

    it('should disable button if passwords do not match', () => {
      const wrapper = testRenderer(ResetPasswordForm, props)
      updateInput(wrapper, 'newPassword', '123456')
      updateInput(wrapper, 'confirmPassword', '123457')
      expect(wrapper.find({ type: 'submit' }).prop('disabled')).toBeTruthy()
    })
  })

  describe('@Events', () => {
    it('should update newPassword input with event onChange', async () => {
      const wrapper = testRenderer(ResetPasswordForm, props)
      const name = 'newPassword'
      const value = '123456'
      updateInput(wrapper, name, value)
      expect(wrapper.find({ name }).get(0).props.value).toEqual(value)
    })

    it('should update confirmPassword input with event onChange', async () => {
      const wrapper = testRenderer(ResetPasswordForm, [], props)
      const name = 'confirmPassword'
      const value = '123456'
      updateInput(wrapper, name, value)
      expect(wrapper.find({ name }).get(0).props.value).toEqual(value)
    })

    it('should call event onSubmit', () => {
      const wrapper = testRenderer(ResetPasswordForm, props)
      const id = '#ResetPasswordForm'
      wrapper.find(id).simulate('submit', { preventDefault: jest.fn() })
      expect(props.resetPassword).toHaveBeenCalledTimes(1)
    })
  })

  describe('@Error', () => {
    it('should render an error message if passwords do not match', async () => {
      const wrapper = testRenderer(ResetPasswordForm, props)
      updateInput(wrapper, 'newPassword', '123456')
      updateInput(wrapper, 'confirmPassword', '123457')
      expect(wrapper.find({ type: 'invalid' }).prop('children')).toEqual(
        'Passwords do not match!!!'
      )
    })
  })
})
