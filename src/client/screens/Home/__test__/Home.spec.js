import { act } from 'react-dom/test-utils'
import { graphRenderer, delay } from '../../../../test/testHelper'
import Home from '../Home'

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children,
}))

describe('<Home>', () => {
  describe('Initial render', () => {
    it('should render', async () => {
      let wrapper
      await act(async () => {
        wrapper = graphRenderer(Home, [], {})
        await delay()
      })
      wrapper.update()
      expect(wrapper.find(Home)).toMatchSnapshot()
    })
  })
})
