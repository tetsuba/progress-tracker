import { graphRenderer, delay } from '../../../../test/testHelper'
import { act } from 'react-dom/test-utils'

// COMPONENTS
import ForgotMyPasswordForm from '../ForgotMyPasswordForm'
import TextLink from '../../TextLink/TextLink'

// MOCK MUTATION
import {
  passwordResetMockDataError,
  passwordResetMockDataSuccess,
} from '../../../../test/mockApi/user/userMockMutation'

describe('<ForgotMyPasswordForm>', () => {
  const props = { setPageState: jest.fn() }

  afterEach(() => {
    props.setPageState.mockReset()
  })

  describe('@Render', () => {
    it('should render the default state', async () => {
      const wrapper = graphRenderer(ForgotMyPasswordForm, [], props)
      expect(wrapper.find(ForgotMyPasswordForm)).toMatchSnapshot()
    })
    // TODO: show and hide button not completed
    it.skip('should render back button', () => {
      const wrapper = graphRenderer(ForgotMyPasswordForm, [], props)
      expect(
        wrapper.find(ForgotMyPasswordForm).find(TextLink)
      ).toMatchSnapshot()
    })
  })

  describe('@Events', () => {
    const email = { name: 'email' }
    const expected = 'test@test.com'

    describe('onSubmit', () => {
      async function onSubmitSteps(mock) {
        const wrapper = graphRenderer(ForgotMyPasswordForm, [mock], props)

        act(() => {
          wrapper
            .find('input[name="email"]')
            .props()
            .onChange({
              persist: jest.fn(),
              target: {
                name: 'email',
                value: expected,
              },
            })
        })
        wrapper.update()

        await act(async () => {
          await wrapper.find('#ForgotMyPasswordForm').get(0).props.onSubmit({
            preventDefault: jest.fn(),
          })
          await delay()
        })

        wrapper.update()
        return wrapper
      }

      it('should be successful', async () => {
        const wrapper = await onSubmitSteps(passwordResetMockDataSuccess)
        wrapper.update()
        expect(props.setPageState).toHaveBeenCalledTimes(1)
      })
      it('should display an error', async () => {
        const wrapper = await onSubmitSteps(passwordResetMockDataError)
        expect(wrapper.find(email).get(0).props.isInvalid).toBeTruthy()
        expect(wrapper.find({ type: 'invalid' }).props().children).toEqual(
          'Email does not exist'
        )
      })
    })

    describe('onChange', () => {
      it('should update email input', () => {
        const wrapper = graphRenderer(ForgotMyPasswordForm, [], {})

        act(() => {
          wrapper
            .find(email)
            .get(0)
            .props.onChange({
              persist: jest.fn(),
              target: {
                name: 'email',
                value: expected,
              },
            })
        })

        wrapper.update()
        expect(wrapper.find(email).get(0).props.value).toEqual(expected)
      })
    })

    describe('onClick', () => {
      it('should trigger prop setPageState', () => {
        const wrapper = graphRenderer(ForgotMyPasswordForm, [], props)
        wrapper.find('#TextLink').props().onClick()
        expect(props.setPageState).toHaveBeenCalledTimes(1)
      })
    })
  })
})
