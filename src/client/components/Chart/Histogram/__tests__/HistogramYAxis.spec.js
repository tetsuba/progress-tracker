import { testRenderer } from '../../../../../test/testHelper'
import HistogramYAxis from '../HistogramYAxis'
import { getMockData } from '../../../../../test/mockData/histogramMockData'

describe('<HistogramYAxis>', () => {
  describe('@Render', () => {
    it('Should render two Y axis values', () => {
      const props = {
        data: getMockData(),
      }
      const wrapper = testRenderer(HistogramYAxis, props)
      expect(wrapper.find('HistogramYAxisValue')).toHaveLength(2)
    })
  })
})
