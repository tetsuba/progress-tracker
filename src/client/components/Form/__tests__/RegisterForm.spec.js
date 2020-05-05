import {
  delay,
  graphRenderer,
  updateTextInput,
} from '../../../../test/testHelper'
import RegisterForm from '../RegisterForm'
import { act } from 'react-dom/test-utils'
import { registerMockDataSuccess } from '../../../../test/mockApi/user/userMockMutation'

describe('<RegisterForm>', () => {
  describe('@Render', () => {
    it('should render', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(RegisterForm, [], {})
        await delay()
      })
      wrapper.update()
      expect(wrapper.find(RegisterForm)).toMatchSnapshot()
    })
  })

  describe('@Events', () => {
    describe('onSubmit', () => {
      it('should call "setPageState"', async () => {
        const props = {
          setPageState: jest.fn(),
        }

        const wrapper = graphRenderer(
          RegisterForm,
          [registerMockDataSuccess],
          props
        )

        act(() => {
          updateTextInput(wrapper, 'firstName', 'unit')
        })

        wrapper.update()

        act(() => {
          updateTextInput(wrapper, 'lastName', 'test')
        })

        wrapper.update()

        act(() => {
          updateTextInput(wrapper, 'email', 'unit@test.com')
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
          await wrapper.find('#RegisterForm').get(0).props.onSubmit({
            preventDefault: jest.fn(),
          })
          await delay()
        })

        wrapper.update()

        expect(props.setPageState).toHaveBeenCalledTimes(1)
      })
    })
  })
})
