import { testRenderer } from '../../../../test/testHelper'
import GlobalModal from '../GlobalModal'

describe.skip('<GlobalModal>', () => {
  it('should render', () => {
    const wrapper = testRenderer(GlobalModal, {})
    expect(wrapper).toMatchSnapshot()
  })
})
