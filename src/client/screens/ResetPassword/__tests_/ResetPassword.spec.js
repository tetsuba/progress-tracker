import { act } from 'react-dom/test-utils'
import { graphRenderer, delay } from '../../../../test/testHelper'

// COMPONENTS
import ResetPassword from '../ResetPassword'

import {
  confirmTokenQueryError,
  confirmTokenQuerySuccess,
} from '../../../../test/mockApi/token/tokenMockQuery'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ token: 'confirmToken1234' }),
  Link: ({ children }) => children,
}))

describe('<ResetPassword>', () => {
  describe('@Render', () => {
    it('should render "loading"', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(ResetPassword, [confirmTokenQuerySuccess], {
          pageState: 'loading',
        })
        await delay()
      })
      expect(wrapper.find(ResetPassword)).toMatchSnapshot()
    })
    it('should render "form"', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(ResetPassword, [confirmTokenQuerySuccess], {
          pageState: 'form',
        })
        await delay()
      })
      expect(wrapper.find(ResetPassword)).toMatchSnapshot()
    })
    it('should render "success"', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(ResetPassword, [confirmTokenQuerySuccess], {
          pageState: 'success',
        })
        await delay()
      })
      expect(wrapper.find(ResetPassword)).toMatchSnapshot()
    })
    it('should render "error"', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(ResetPassword, [confirmTokenQuerySuccess], {
          pageState: 'error',
        })
        await delay()
      })
      expect(wrapper.find(ResetPassword)).toMatchSnapshot()
    })
  })

  describe('@Query', () => {
    describe('Success', () => {
      it('should render form', async () => {
        let wrapper
        await act(async () => {
          wrapper = graphRenderer(ResetPassword, [confirmTokenQuerySuccess], {})
          await delay()
        })
        wrapper.update()
        expect(wrapper.find(ResetPassword)).toMatchSnapshot()
      })
    })
    describe('Error', () => {
      it('should render error', async () => {
        let wrapper
        await act(async () => {
          wrapper = graphRenderer(ResetPassword, [confirmTokenQueryError], {})
          await delay()
        })
        wrapper.update()
        expect(wrapper.find(ResetPassword)).toMatchSnapshot()
      })
    })
  })
})
