import { testRenderer } from '../../../../../test/testHelper'
import Histogram from '../Histogram'

describe('<Histogram>', () => {
  describe('@Render', () => {
    it('Should render', () => {
      const props = {
        data: {},
      }
      const wrapper = testRenderer(Histogram, props)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
