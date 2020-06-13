import { testRenderer } from '../../../../../test/testHelper'
import HistogramYAxisValue from '../HistogramYAxisValue'

describe('<HistogramYAxisValue>', () => {
  describe('@Render', () => {
    it('Should render a start value', () => {
      const startValueExpected = '1'
      const props = {
        index: 0,
        data: { a: { total: 3 } },
      }
      const wrapper = testRenderer(HistogramYAxisValue, props)
      expect(wrapper.find('span').props().children).toEqual(startValueExpected)
    })

    it('Should render an end value', () => {
      const endValueExpected = '4'
      const props = {
        index: 3,
        data: { a: { total: 4 } },
      }
      const wrapper = testRenderer(HistogramYAxisValue, props)
      expect(wrapper.find('span').props().children).toEqual(endValueExpected)
    })

    it('Should not render a value', () => {
      const props = {
        index: 1,
        data: { a: { total: 3 } },
      }
      const wrapper = testRenderer(HistogramYAxisValue, props)
      expect(wrapper.find('span')).toHaveLength(0)
    })
  })
})
