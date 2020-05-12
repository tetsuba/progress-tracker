import { testRenderer } from '../../../../test/testHelper'
import Header from '../Header'

describe('<Header>', () => {
  it('should render', () => {
    const wrapper = testRenderer(Header, {})
    expect(wrapper).toMatchSnapshot()
  })
})
