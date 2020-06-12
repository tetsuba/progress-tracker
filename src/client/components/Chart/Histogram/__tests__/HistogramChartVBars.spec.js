import { testRenderer } from '../../../../../test/testHelper'
import HistogramChartVBars from '../HistogramChartVBars'

describe('<HistogramChartVBars>', () => {
  describe('@Render', () => {
    const props = {
      data: {
        total: 4,
        correct: 2,
        wrong: 2,
        history: [1, 1, 2, 2],
      },
    }
    const wrapper = testRenderer(HistogramChartVBars, props)

    it('Should render four vertical range bars', () => {
      expect(wrapper.find('HistogramChartVRangeBar')).toHaveLength(4)
    })

    it('Should render two correct vertical range bars', () => {
      let counter = 0
      wrapper.find('HistogramChartVRangeBar').forEach((ele) => {
        if (ele.props().correct) counter += 1
      })

      expect(counter).toEqual(2)
    })

    it('Should render two wrong vertical range bars', () => {
      let counter = 0
      wrapper.find('HistogramChartVRangeBar').forEach((ele) => {
        if (ele.props().wrong) counter += 1
      })

      expect(counter).toEqual(2)
    })
  })
})
