import { delay, graphRenderer } from '../../../../test/testHelper'

// COMPONENTS
import ResetPasswordForm from '../ResetPasswordForm'
import { act } from 'react-dom/test-utils'
import { resetUserPasswordSuccess } from '../../../../test/mockApi/user/userMockMutation'

describe('<ResetPasswordForm>', () => {
  const props = {
    token: 'confirmToken1234',
    setPageState: jest.fn(),
  }

  function updateInput(wrapper, name, value) {
    wrapper.find({ name }).get(0).props.onChange({
      persist: jest.fn(),
      target: { name, value },
    })
  }

  describe('@Render', () => {
    it('should render reset password form', () => {
      const wrapper = graphRenderer(ResetPasswordForm, [], props)
      expect(wrapper.find(ResetPasswordForm)).toMatchSnapshot()
    })
  })

  describe('@Events', () => {
    describe('onSubmit', () => {
      it('should call props setPageState', async () => {
        const wrapper = graphRenderer(
          ResetPasswordForm,
          [resetUserPasswordSuccess],
          props
        )

        act(() => {
          updateInput(wrapper, 'newPassword', 'password01')
        })

        wrapper.update()

        act(() => {
          updateInput(wrapper, 'confirmPassword', 'password01')
        })

        wrapper.update()

        await act(async () => {
          wrapper
            .find('form#ResetPasswordForm')
            .simulate('submit', { preventDefault: jest.fn() })
          await delay()
        })

        wrapper.update()

        expect(props.setPageState).toHaveBeenCalledTimes(1)
      })
    })
  })
})
