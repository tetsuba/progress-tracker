import { act } from 'react-dom/test-utils'
import {
  delay,
  graphRenderer,
  updateTextInput,
} from '../../../../test/testHelper'
import Register from '../../Register/Register'

// MOCKDATA
import { registerMockDataSuccess } from '../../../../test/mockApi/user/userMockMutation'

describe('<Register>', () => {
  describe('Initial render', () => {
    it('should render "register"', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(Register, [], {})
        await delay()
      })
      wrapper.update()
      expect(wrapper.find(Register)).toMatchSnapshot()
    })
    describe('A user submits registration form', () => {
      it('should render "success"', async () => {
        let wrapper
        await act(async () => {
          wrapper = graphRenderer(Register, [registerMockDataSuccess], {})
          await delay()
        })

        wrapper.update()

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

        expect(wrapper.find(Register)).toMatchSnapshot()
      })
    })
  })
})
