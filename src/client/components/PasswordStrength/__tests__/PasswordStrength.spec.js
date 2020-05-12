import { testRenderer } from '../../../../test/testHelper'
import PasswordStrength from '../PasswordStrength'

describe.skip('<PasswordStrength>', () => {
  it('should render', () => {
    const wrapper = testRenderer(PasswordStrength, {})
    expect(wrapper).toMatchSnapshot()
  })
})
