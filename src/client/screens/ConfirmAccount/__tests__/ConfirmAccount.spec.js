import { act } from 'react-dom/test-utils'
import { delay, graphRenderer } from '../../../../test/testHelper'
import ConfirmAccount from '../ConfirmAccount'

import {
  validateUserEmailQuerySuccess,
  validateUserEmailQueryError,
} from '../../../../test/mockApi/user/userMockQuery'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ token: 'confirmToken1234' }),
  Link: ({ children }) => children,
}))

describe('<ConfirmAccount>', () => {
  describe('@Render', () => {
    it('should render "loading"', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(
          ConfirmAccount,
          [validateUserEmailQuerySuccess],
          { pageState: 'loading' }
        )
        await delay()
      })
      expect(wrapper.find(ConfirmAccount)).toMatchSnapshot()
    })
    it('should render "tokenExpired"', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(
          ConfirmAccount,
          [validateUserEmailQuerySuccess],
          { pageState: 'tokenExpired' }
        )
        await delay()
      })
      expect(wrapper.find(ConfirmAccount)).toMatchSnapshot()
    })
    it('should render "accountVerified"', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(
          ConfirmAccount,
          [validateUserEmailQuerySuccess],
          { pageState: 'accountVerified' }
        )
        await delay()
      })
      expect(wrapper.find(ConfirmAccount)).toMatchSnapshot()
    })
    it('should render "success"', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(
          ConfirmAccount,
          [validateUserEmailQuerySuccess],
          { pageState: 'success' }
        )
        await delay()
      })
      expect(wrapper.find(ConfirmAccount)).toMatchSnapshot()
    })
  })

  describe('@Query', () => {
    describe('Success', () => {
      it('should render "accountVerified"', async () => {
        let wrapper
        await act(async () => {
          wrapper = graphRenderer(
            ConfirmAccount,
            [validateUserEmailQuerySuccess],
            {}
          )
          await delay()
        })
        wrapper.update()
        expect(wrapper.find(ConfirmAccount)).toMatchSnapshot()
      })
    })
    describe('Error', () => {
      it('should render "tokenExpired"', async () => {
        let wrapper
        await act(async () => {
          wrapper = graphRenderer(
            ConfirmAccount,
            [validateUserEmailQueryError],
            {}
          )
          await delay()
        })
        wrapper.update()
        expect(wrapper.find(ConfirmAccount)).toMatchSnapshot()
      })
    })
  })
})
