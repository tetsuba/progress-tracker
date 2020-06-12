import { testRenderer } from '../../../../../test/testHelper'
import HistogramChartVRangeBar from '../HistogramChartVRangeBar'

describe('<HistogramChartVRangeBar>', () => {
  describe('@Render', () => {
    it('Should render a true value', () => {
      const props = {
        correct: true,
        wrong: false,
        height: 20,
      }
      const wrapper = testRenderer(HistogramChartVRangeBar, props)
      expect(wrapper).toMatchSnapshot()
    })

    it('Should render a false value', () => {
      const props = {
        correct: true,
        wrong: false,
        height: 20,
      }
      const wrapper = testRenderer(HistogramChartVRangeBar, props)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
