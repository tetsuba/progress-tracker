import { delay, graphRenderer } from '../../../../test/testHelper'

// COMPONENTS
import LoginForm from '../LoginForm'
import { act } from 'react-dom/test-utils'
import {
  loginUserMutationError,
  loginUserMutationErrorNotVerified,
  loginUserMutationSuccess,
} from '../../../../test/mockApi/user/userMockMutation'
import TextLink from '../../TextLink/TextLink'

describe('<LoginForm>', () => {
  const baseProps = {
    setPageSate: jest.fn(),
  }

  describe('@Render', () => {
    it('should render the default state', async () => {
      const wrapper = graphRenderer(LoginForm, [], baseProps)
      expect(wrapper.find(LoginForm)).toMatchSnapshot()
    })
  })

  describe('@Events', () => {
    const email = { name: 'email' }

    describe('onSubmit', () => {
      afterEach(() => {
        window.localStorage.setItem('ptToken', '')
      })

      async function onSubmitSteps(mock) {
        const wrapper = graphRenderer(LoginForm, [mock], baseProps)

        act(() => {
          wrapper
            .find('input[name="email"]')
            .props()
            .onChange({
              persist: jest.fn(),
              target: {
                name: 'email',
                value: 'test@test.com',
              },
            })
        })
        wrapper.update()

        act(() => {
          wrapper
            .find('input[name="password"]')
            .props()
            .onChange({
              persist: jest.fn(),
              target: {
                name: 'password',
                value: 'password01',
              },
            })
        })

        wrapper.update()

        await act(async () => {
          await wrapper.find('#LoginForm').get(0).props.onSubmit({
            preventDefault: jest.fn(),
          })
          await delay()
        })

        wrapper.update()
        return wrapper
      }

      it('should be successful and save a token in localStorage', async () => {
        expect(window.localStorage.getItem('ptToken')).toBeNull()
        const wrapper = await onSubmitSteps(loginUserMutationSuccess)
        wrapper.update()
        expect(window.localStorage.getItem('ptToken')).toEqual('token')
      })
      it('should display an error', async () => {
        const wrapper = await onSubmitSteps(loginUserMutationError)
        expect(wrapper.find(email).get(0).props.isInvalid).toBeTruthy()
        expect(wrapper.find({ type: 'invalid' }).get(0).props.children).toEqual(
          'You have entered incorrect username or password'
        )
      })
      it.skip('should call prop setPageState when email is not verified', async () => {
        await onSubmitSteps(loginUserMutationErrorNotVerified)
        expect(baseProps.setPageState).toHaveBeenCalledTimes(1)
      })
    })

    describe.skip('onChange', () => {})

    describe.skip('onClick', () => {
      it('should trigger prop setPageState', () => {
        const wrapper = graphRenderer(LoginForm, [])
        console.log(wrapper.find(TextLink).props())
        wrapper.find(TextLink).props().onClick()
        expect(baseProps.setPageState).toHaveBeenCalledTimes(1)
      })
    })
  })
})
