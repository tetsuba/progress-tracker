import { testRenderer } from '../../../../../test/testHelper'
import HistogramXAxisValue from '../HistogramXAxisValue'

describe('<HistogramXAxisValue>', () => {
  describe('@Render', () => {
    it('Should render a value', () => {
      const props = {
        letter: 'a',
      }
      const wrapper = testRenderer(HistogramXAxisValue, props)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
