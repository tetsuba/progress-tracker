import { testRenderer } from '../../../../../test/testHelper'
import HistogramKey from '../HistogramKey'

describe('<HistogramKey>', () => {
  describe('@Render', () => {
    it('Should render', () => {
      const wrapper = testRenderer(HistogramKey)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
