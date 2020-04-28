import { act } from 'react-dom/test-utils'
import { graphRenderer } from '../../../../test/testHelper'
import Home from '../Home'

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children,
}))

describe('<Home>', () => {
  describe('Initial render', () => {
    it('should render', () => {
      let wrapper
      act(() => {
        wrapper = graphRenderer(Home, [], {})
      })
      expect(wrapper.find(Home)).toMatchSnapshot()
    })
  })
})
