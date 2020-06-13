import { getMockData } from '../../../../../test/mockData/histogramMockData'
import { testRenderer } from '../../../../../test/testHelper'
import HistogramChart from '../HistogramChart'

describe('<HistogramChart>', () => {
  describe('@Render', () => {
    it('Should render 26 vertical bars', () => {
      const props = {
        data: getMockData(),
      }
      const wrapper = testRenderer(HistogramChart, props)
      expect(wrapper.find('HistogramChartVBars')).toHaveLength(26)
    })
  })
})
