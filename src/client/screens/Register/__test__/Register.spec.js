import { testRenderer } from '../../../../test/testHelper'
import Register from '../../Register/Register'

describe('<Register>', () => {
  describe('@Render', () => {
    it('should render "register"', async () => {
      const wrapper = testRenderer(Register, { pageState: 'register' })
      expect(wrapper).toMatchSnapshot()
    })
    it('should render "success"', async () => {
      const wrapper = testRenderer(Register, { pageState: 'success' })
      expect(wrapper).toMatchSnapshot()
    })
  })
})
