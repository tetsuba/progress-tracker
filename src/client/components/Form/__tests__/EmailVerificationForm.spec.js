import { Link } from 'react-router-dom'
import { delay, graphRenderer } from '../../../../test/testHelper'
import { act } from 'react-dom/test-utils'

// COMPONENTS
import EmailVerificationForm from '../EmailVerificationForm'

import {
  verifyUserEmailMutationSuccess,
  verifyUserEmailMutationError,
} from '../../../../test/mockApi/user/userMockMutation'

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children,
}))

describe('<EmailVerificationForm>', () => {
  const props = { setPageState: jest.fn() }

  afterEach(() => {
    props.setPageState.mockReset()
  })

  describe('@Render', () => {
    it('should render the default state', async () => {
      const wrapper = graphRenderer(EmailVerificationForm, [], {})
      expect(wrapper.find(EmailVerificationForm)).toMatchSnapshot()
    })

    it('should render back button', () => {
      const wrapper = graphRenderer(EmailVerificationForm, [], props)
      expect(wrapper.find(EmailVerificationForm).find(Link)).toMatchSnapshot()
    })
  })

  describe('@Events', () => {
    const email = { name: 'email' }
    const expected = 'test@test.com'

    describe('onSubmit', () => {
      async function onSubmitSteps(mock) {
        const wrapper = graphRenderer(EmailVerificationForm, [mock], props)

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
          await wrapper.find('#EmailVerificationForm').get(0).props.onSubmit({
            preventDefault: jest.fn(),
          })
          await delay()
        })

        wrapper.update()
        return wrapper
      }

      it('should be successful', async () => {
        const wrapper = await onSubmitSteps(verifyUserEmailMutationSuccess)
        wrapper.update()
        expect(props.setPageState).toHaveBeenCalledTimes(1)
      })
      it('should display an error', async () => {
        const wrapper = await onSubmitSteps(verifyUserEmailMutationError)
        expect(wrapper.find(email).get(0).props.isInvalid).toBeTruthy()
        expect(wrapper.find({ type: 'invalid' }).props().children).toEqual(
          'Email does not exist'
        )
      })
    })

    describe('onChange', () => {
      it('should update email input', () => {
        const wrapper = graphRenderer(EmailVerificationForm, [], {})

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
  })
})
