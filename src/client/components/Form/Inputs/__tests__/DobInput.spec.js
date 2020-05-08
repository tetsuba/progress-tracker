import { testRenderer } from '../../../../../test/testHelper'
import DobInput from '../DobInput'

describe('<DobInput>', () => {
  const baseProps = {
    setInputs: jest.fn(),
    inputs: {
      DOBDate: '02',
      DOBMonth: '03',
      DOBYear: 2020,
    },
  }

  describe('@Render', () => {
    it('should render', () => {
      const props = {
        ...baseProps,
      }
      const wrapper = testRenderer(DobInput, props)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
