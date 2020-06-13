import { testRenderer } from '../../../../../test/testHelper'
import HistogramXAxis from '../HistogramXAxis'
import { getMockData } from '../../../../../test/mockData/histogramMockData'

describe('<HistogramXAxis>', () => {
  describe('@Render', () => {
    it('Should render every letter in the alphabet', () => {
      const props = {
        data: getMockData(),
      }
      const keys = Object.keys(props.data)
      const wrapper = testRenderer(HistogramXAxis, props)
      expect(wrapper.find('HistogramXAxisValue')).toHaveLength(26)
      expect(
        wrapper.find('HistogramXAxisValue').map((ele) => ele.prop('letter'))
      ).toEqual(keys)
    })
  })
})
