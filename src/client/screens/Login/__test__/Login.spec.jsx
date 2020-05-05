import { testRenderer } from '../../../../test/testHelper'

// COMPONENTS
import Login from '../Login'

describe('<Login>', () => {
  describe('@Render', () => {
    it('should render "login"', async () => {
      const wrapper = testRenderer(Login, { pageState: 'login' })
      expect(wrapper).toMatchSnapshot()
    })
    it('should render "forgetMyPassword"', async () => {
      const wrapper = testRenderer(Login, { pageState: 'forgetMyPassword' })
      expect(wrapper).toMatchSnapshot()
    })
    it('should render "emailNotVerified"', async () => {
      const wrapper = testRenderer(Login, { pageState: 'emailNotVerified' })
      expect(wrapper).toMatchSnapshot()
    })
    it('should render "success"', async () => {
      const wrapper = testRenderer(Login, { pageState: 'success' })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
